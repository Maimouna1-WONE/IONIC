<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CompteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=CompteRepository::class)
 * @UniqueEntity(
 *     fields={"numero"},
 *     message = "ce compte existe deja"
 * )
 * @ApiResource (
 *     routePrefix="/comptes",
 *     collectionOperations={
 *     "getComptes"={"method"="GET",
 *                      "path"="",
 *     "normalization_context"={"groups"={"getcompte:read"}},
 *     "security"="is_granted('ROLE_ADMIN_SYS')",
 *          "security_message"="Vous n'avez pas access à cette Ressource"}
 *     },
 *     itemOperations={
 *              "getCompteId"={
 *                    "method"="GET",
 *                      "path"="/{id}",
 *                          "requirements"={"id":"\d+"},
 *     "security"="is_granted('ROLE_ADMIN_SYS')",
 *          "security_message"="Vous n'avez pas access à cette Ressource"
 *                },"updateCompte"={
 *                    "method"="PUT",
 *                      "route_name"="updateCompte",
 *     "denormalization_context"={"groups"={"putcompte:write"}},
 *     "security"="is_granted('ROLE_CAISSIER')",
 *          "security_message"="Vous n'avez pas access à cette Ressource"
 *                },
 *     "deleteCompte"={"method"="DELETE",
 *                          "path"="/{id}",
 *                          "requirements"={"id":"\d+"},
 *     "security"="is_granted('ROLE_ADMIN_SYS')",
 *          "security_message"="Vous n'avez pas access à cette Ressource"}
 *     }
 * )
 */
class Compte
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups ({"getcompte:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255,unique=true)
     * @Groups ({"getcompte:read","postagence:write"})
     */
    private $numero;

    /**
     * @ORM\Column(type="integer", name="solde", options={"default": 700000})
     * @Groups ({"getcompte:read","putcompte:write","postagence:write"})
     * @Assert\GreaterThanOrEqual(
     *     value = 700000
     * )
     */
    private $solde = 700000;

    /**
     * @ORM\Column(type="date")
     * @Groups ({"getcompte:read","postagence:write"})
     */
    private $createdAt;

    /**
     * @ORM\Column(name="statut", type="boolean", options={"default":false})
     */
    private $statut = false;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="comptes")
     * @Groups ({"putcompte:write"})
     */
    private $user;

    /**
     * @ORM\OneToMany(targetEntity=Transaction::class, mappedBy="compte")
     */
    private $transactions;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Groups ({"putcompte:write"})
     */
    private $date_depot;


    public function __construct()
    {
        $this->transactions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumero(): ?string
    {
        return $this->numero;
    }

    public function setNumero(string $numero): self
    {
        $this->numero = $numero;

        return $this;
    }

    public function getSolde(): ?int
    {
        return $this->solde;
    }

    public function setSolde(int $solde): self
    {
        $this->solde = $solde;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getStatut(): ?bool
    {
        return $this->statut;
    }

    public function setStatut(bool $statut): self
    {
        $this->statut = $statut;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection|Transaction[]
     */
    public function getTransactions(): Collection
    {
        return $this->transactions;
    }

    public function addTransaction(Transaction $transaction): self
    {
        if (!$this->transactions->contains($transaction)) {
            $this->transactions[] = $transaction;
            $transaction->setCompte($this);
        }

        return $this;
    }

    public function removeTransaction(Transaction $transaction): self
    {
        if ($this->transactions->removeElement($transaction)) {
            // set the owning side to null (unless already changed)
            if ($transaction->getCompte() === $this) {
                $transaction->setCompte(null);
            }
        }

        return $this;
    }

    public function getDateDepot(): ?\DateTimeInterface
    {
        return $this->date_depot;
    }

    public function setDateDepot(?\DateTimeInterface $date_depot): self
    {
        $this->date_depot = $date_depot;

        return $this;
    }
}
