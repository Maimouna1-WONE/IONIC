<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use App\Repository\TransactionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=TransactionRepository::class)
 * @ApiResource (
 *      routePrefix="/transactions",
 *     collectionOperations={
 *     "depotCaisssier"={"method"="POST",
 *                      "route_name"="depotCaisssier",
 *     "security"="is_granted('ROLE_ADMIN_AGENCE') or is_granted('ROLE_CAISSIER')",
 *          "security_message"="Vous n'avez pas access à cette Ressource"}
 *     },
 *     itemOperations={
 *     "getTransactions"={"method"="GET",
 *                      "route_name"="getTransactions",
 *     "normalization_context"={"groups"={"getcode:read"}},
 *      "security"="is_granted('ROLE_ADMIN_AGENCE') or is_granted('ROLE_UTILISATEUR_AGENCE')",
 *          "security_message"="Vous n'avez pas access à cette Ressource"},
 *              "getTransactionId"={
 *                    "method"="GET",
 *                      "path"="/{id}",
 *                          "requirements"={"id":"\d+"},
 *     "security"="is_granted('ROLE_ADMIN_AGENCE') or is_granted('ROLE_UTILISATEUR_AGENCE')",
 *          "security_message"="Vous n'avez pas access à cette Ressource"
 *                },
 *     "deleteTransaction"={"method"="DELETE",
 *                          "route_name"="deleteTransaction",
 *     "security"="is_granted('ROLE_ADMIN_AGENCE') or is_granted('ROLE_UTILISATEUR_AGENCE')",
 *          "security_message"="Vous n'avez pas access à cette Ressource"},
 *     "getTransactionCode"={
 *                    "method"="GET",
 *                      "route_name"="code",
 *     "security"="is_granted('ROLE_ADMIN_AGENCE') or is_granted('ROLE_UTILISATEUR_AGENCE')",
 *          "security_message"="Vous n'avez pas access à cette Ressource",
 *     "normalization_context"={"groups"={"getcode:read"}}
 *                },"getMestransaction"={
 *                    "method"="GET",
 *                      "route_name"="getMestransaction",
 *     "security"="is_granted('ROLE_ADMIN_AGENCE') or is_granted('ROLE_UTILISATEUR_AGENCE')",
 *          "security_message"="Vous n'avez pas access à cette Ressource",
 *     "normalization_context"={"groups"={"getcode:read"}}},
 *     "gettransactionencours"={
 *                    "method"="GET",
 *                      "route_name"="gettransactionencours",
 *     "security"="is_granted('ROLE_ADMIN_AGENCE') or is_granted('ROLE_UTILISATEUR_AGENCE')",
 *          "security_message"="Vous n'avez pas access à cette Ressource",
 *     "normalization_context"={"groups"={"getcode:read"}}
 *                }
 *     }
 * )
 */
class Transaction
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups ({"gettransaction:read","getcode:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Groups ({"gettransaction:read","depotua:write","getcode:read","recudepot:read","recuratrait:read"})
     * @Assert\NotBlank(message = "Donner le montant")
     * @Assert\PositiveOrZero(
     *      message="Le montant doit etre positif"
     * )
     */
    private $montant;

    /**
     * @ORM\Column(type="date")
     * @Groups ({"gettransaction:read","recudepot:read","getcode:read"})
     * @Groups ({"getcompte:read"})
     */
    private $date_depot;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Groups ({"gettransaction:read","recuratrait:read","getcode:read"})
     */
    private $date_retrait;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups ({"gettransaction:read","recudepot:read","getcode:read"})
     */
    private $code;

    /**
     * @ORM\Column(type="integer")
     * @Groups ({"gettransaction:read","depotua:write","getcode:read"})
     * @Assert\NotBlank(message = "Donner les frais")
     */
    private $frais;

    /**
     * @ORM\Column(type="integer")
     * @Groups ({"gettransaction:read","depotua:write","getcode:read","getpart:read","recudepot:read"})
     */
    private $frais_depot;

    /**
     * @ORM\Column(type="integer")
     * @Groups ({"gettransaction:read","depotua:write","getcode:read","getpart:read","recuratrait:read"})
     */
    private $frais_retrait;

    /**
     * @ORM\Column(type="integer")
     * @Groups ({"gettransaction:read","depotua:write","getpart:read","getcode:read"})
     */
    private $frais_etat;

    /**
     * @ORM\Column(type="integer")
     * @Groups ({"gettransaction:read","depotua:write","getpart:read","getcode:read"})
     */
    private $frais_systeme;

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     * @Assert\NotBlank(message = "Donner le type de la transaction")
     * @Assert\Regex(
     *     pattern="/depot|retrait/",
     *     message="Preciser le type de la transaction"
     * )
     * @Groups ({"recudepot:read","recuratrait:read","getcode:read","gettransaction:read"})
     */
    private $type;

    /**
     * @ORM\ManyToOne(targetEntity=Compte::class, inversedBy="transactions")
     */
    private $compte;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="transactions", cascade={"persist"})
     * @Groups ({"depotua:write","recudepot:read","getcode:read"})
     */
    private $user_depot;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="transactions", cascade={"persist"})
     * @Groups ({"depotua:write","recuratrait:read","getcode:read"})
     */
    private $user_retrait;

    /**
     * @ORM\ManyToOne(targetEntity=Client::class, inversedBy="transactions")
     * @Groups ({"getcode:read"})
     */
    private $client_depot;

    /**
     * @ORM\ManyToOne(targetEntity=Client::class, inversedBy="transactions")
     * @Groups ({"getcode:read"})
     */
    private $client_retrait;

    /**
     * @ORM\Column(name="statut", type="boolean", options={"default":false})
     */
    private $statut = false;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMontant(): ?int
    {
        return $this->montant;
    }

    public function setMontant(int $montant): self
    {
        $this->montant = $montant;

        return $this;
    }

    public function getDateDepot(): ?\DateTimeInterface
    {
        return $this->date_depot;
    }

    public function setDateDepot(\DateTimeInterface $date_depot): self
    {
        $this->date_depot = $date_depot;

        return $this;
    }

    public function getDateRetrait(): ?\DateTimeInterface
    {
        return $this->date_retrait;
    }

    public function setDateRetrait(\DateTimeInterface $date_retrait): self
    {
        $this->date_retrait = $date_retrait;

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getFrais(): ?int
    {
        return $this->frais;
    }

    public function setFrais(int $frais): self
    {
        $this->frais = $frais;

        return $this;
    }

    public function getFraisDepot(): ?int
    {
        return $this->frais_depot;
    }

    public function setFraisDepot(int $frais_depot): self
    {
        $this->frais_depot = $frais_depot;

        return $this;
    }

    public function getFraisRetrait(): ?int
    {
        return $this->frais_retrait;
    }

    public function setFraisRetrait(int $frais_retrait): self
    {
        $this->frais_retrait = $frais_retrait;

        return $this;
    }

    public function getFraisEtat(): ?int
    {
        return $this->frais_etat;
    }

    public function setFraisEtat(int $frais_etat): self
    {
        $this->frais_etat = $frais_etat;

        return $this;
    }

    public function getFraisSysteme(): ?int
    {
        return $this->frais_systeme;
    }

    public function setFraisSysteme(int $frais_systeme): self
    {
        $this->frais_systeme = $frais_systeme;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getCompte(): ?Compte
    {
        return $this->compte;
    }

    public function setCompte(?Compte $compte): self
    {
        $this->compte = $compte;

        return $this;
    }

    public function getUserDepot(): ?User
    {
        return $this->user_depot;
    }

    public function setUserDepot(?User $user_depot): self
    {
        $this->user_depot = $user_depot;

        return $this;
    }

    public function getUserRetrait(): ?User
    {
        return $this->user_retrait;
    }

    public function setUserRetrait(?User $user_retrait): self
    {
        $this->user_retrait = $user_retrait;

        return $this;
    }

    public function getClientDepot(): ?Client
    {
        return $this->client_depot;
    }

    public function setClientDepot(?Client $client_depot): self
    {
        $this->client_depot = $client_depot;

        return $this;
    }

    public function getClientRetrait(): ?Client
    {
        return $this->client_retrait;
    }

    public function setClientRetrait(?Client $client_retrait): self
    {
        $this->client_retrait = $client_retrait;

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
}
