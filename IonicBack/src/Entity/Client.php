<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ClientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=ClientRepository::class)
 * @ApiResource (
 *      routePrefix="/clients",
 *     collectionOperations={
 *      "depotClient"={
 *                      "method"="POST",
 *                      "route_name"="depotClient",
 *     "denormalization_context"={"groups"={"depotclient:write"}},
 *     "security"="is_granted('ROLE_UTILISATEUR_AGENCE')",
 *          "security_message"="Vous n'avez pas access à cette Ressource"
 *                   },"retraitClient"={
 *                      "method"="POST",
 *                      "route_name"="retraitClient",
 *     "denormalization_context"={"groups"={"depotclient:write"}},
 *     "security"="is_granted('ROLE_UTILISATEUR_AGENCE')",
 *          "security_message"="Vous n'avez pas access à cette Ressource"
 *                   }
 *     },
 *     itemOperations={}
 * )
 */
class Client
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups ({"depotclient:write"})
     */
    private $nom_complet;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message = "Donner le telephone")
     * @Assert\Regex(
     *     pattern="/^7[7|6|8|0|5][0-9]{7}$/",
     *     message="Seuls les operateurs Tigo, Expresso, ProMobile et Orange sont permis"
     * )
     * @Groups ({"depotclient:write"})
     */
    private $telephone;

    /**
     * @ORM\Column(type="string", length=13)
     * @Groups ({"depotclient:write"})
     */
    private $cni;

    /**
     * @ORM\OneToMany(targetEntity=Transaction::class, mappedBy="client_depot", cascade={"persist"})
     * @Groups ({"depotclient:write"})
     */
    private $transactions;

    public function __construct()
    {
        $this->transactions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomComplet(): ?string
    {
        return $this->nom_complet;
    }

    public function setNomComplet(string $nom_complet): self
    {
        $this->nom_complet = $nom_complet;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(string $telephone): self
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getCni(): ?string
    {
        return $this->cni;
    }

    public function setCni(string $cni): self
    {
        $this->cni = $cni;

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
            $transaction->setClientDepot($this);
        }

        return $this;
    }

    public function removeTransaction(Transaction $transaction): self
    {
        if ($this->transactions->removeElement($transaction)) {
            // set the owning side to null (unless already changed)
            if ($transaction->getClientDepot() === $this) {
                $transaction->setClientDepot(null);
            }
        }

        return $this;
    }
}
