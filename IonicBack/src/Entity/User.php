<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @UniqueEntity(
 *     fields={"email"},
 *     message = "cet email existe deja"
 * )
 * @ApiResource(
 *     routePrefix="/users",
 *     collectionOperations={
 *                 "postUser"={
 *                      "method"="POST",
 *                      "route_name"="postUser",
 *     "denormalization_context"={"groups"={"postuser:write"}}
 *                   },
 *               "getUsers"={"method"="GET",
 *                      "path"="",
 *     "normalization_context"={"groups"={"getuser:read"}},
 *     "security"="is_granted('ROLE_ADMIN_SYS')",
 *          "security_message"="Vous n'avez pas access à cette Ressource"},
 *     "getCaissiers"={"method"="GET",
 *                      "route_name"="getCaissiers",
 *     "normalization_context"={"groups"={"getuser:read"}},
 *     "security"="is_granted('ROLE_ADMIN_SYS')",
 *          "security_message"="Vous n'avez pas access à cette Ressource"}
 *     },
 *     itemOperations={
 *              "getId"={"method"="GET",
 *                      "path"="/{id}",
 *      "requirements"={"id":"\d+"},
 *     "normalization_context"={"groups"={"getuser:read"}},
 *     "security"="is_granted('ROLE_ADMIN_SYS')",
 *          "security_message"="Vous n'avez pas access à cette Ressource"},
 *              "putUser"={"method"="PUT",
 *                      "route_name"="putUser",
 *     "denormalization_context"={"groups"={"postuser:write"}},
 *     "security"="is_granted('ROLE_ADMIN_SYS')",
 *          "security_message"="Vous n'avez pas access à cette Ressource"},
 *              "delete"={"method"="DELETE",
 *                          "path"="/{id}",
 *                          "requirements"={"id":"\d+"},
 *     "security"="is_granted('ROLE_ADMIN_SYS')",
 *          "security_message"="Vous n'avez pas access à cette Ressource"},
 *      "deleteCaissiers"={"method"="DELETE",
 *                          "route_name"="deleteCaissiers",
 *     "security"="is_granted('ROLE_ADMIN_SYS')",
 *          "security_message"="Vous n'avez pas access à cette Ressource"}
 *  }
 * )
 * @ApiFilter(BooleanFilter::class, properties={"archive"})
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups ({"getuser:read","getusersprofil:read","getuseragence:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups ({"postuser:write"})
     * @Groups ({"getuser:read","getusersprofil:read","getuseragence:read"})
     */
    private $email;

    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups ({"postuser:write"})
     * @Assert\NotBlank(message = "Donner le prenom")
     * @Assert\Regex(
     *      pattern="/^[A-Z][a-z]+$/",
     *      message="Le prenom commence par une lettre majuscule"
     * )
     * @Groups ({"getuser:read","getusersprofil:read","getuseragence:read","depotua:write","recudepot:read","recuratrait:read"})
     */
    private $prenom;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups ({"postuser:write"})
     * @Assert\NotBlank(message = "Donner le nom")
     * @Assert\Regex(
     *      pattern="/^[A-Z]+$/",
     *      message="Le nom est ecrit en lettre capitale"
     * )
     * @Groups ({"getuser:read","getusersprofil:read","getuseragence:read","depotua:write","recudepot:read","recuratrait:read"})
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups ({"postuser:write"})
     * @Assert\NotBlank(message = "Donner le telephone")
     * @Assert\Regex(
     *     pattern="/^7[7|6|8|0|5][0-9]{7}$/",
     *     message="Seuls les operateurs Tigo, Expresso, ProMobile et Orange sont permis"
     * )
     * @Groups ({"getuser:read","getusersprofil:read","getuseragence:read","depotua:write","recudepot:read","recuratrait:read"})
     */
    private $telephone;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups ({"postuser:write"})
     * @Assert\NotBlank(message = "Donner le telephone")
     * @Groups ({"getuser:read","getusersprofil:read","getuseragence:read"})
     */
    private $adresse;

    /**
     * @SerializedName("password")
     */
    private $plainPassword;

    /**
     * @ORM\Column(type="blob", nullable=true)
     * @Groups ({"getuser:read","getuseragence:read"})
     */
    private $avatar;

    /**
     * @ORM\Column(name="statut", type="boolean", options={"default":false})
     */
    private $statut = false;

    /**
     * @ORM\ManyToOne(targetEntity=Profil::class, inversedBy="users")
     * @Groups ({"postuser:write","getuser:read"})
     */
    private $profil;

    /**
     * @ORM\ManyToOne(targetEntity=Agence::class, inversedBy="users")
     */
    private $agence;

    /**
     * @ORM\OneToMany(targetEntity=Compte::class, mappedBy="user")
     */
    private $comptes;

    /**
     * @ORM\OneToMany(targetEntity=Transaction::class, mappedBy="user_depot")
     */
    private $transactions;

    public function __construct()
    {
        $this->comptes = new ArrayCollection();
        $this->transactions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_' . $this->profil->getLibelle();
        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

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

    public function getStatut(): ?bool
    {
        return $this->statut;
    }

    public function setStatut(bool $statut): self
    {
        $this->statut = $statut;

        return $this;
    }

    public function getProfil(): ?Profil
    {
        return $this->profil;
    }

    public function setProfil(?Profil $profil): self
    {
        $this->profil = $profil;

        return $this;
    }

    public function getAgence(): ?Agence
    {
        return $this->agence;
    }

    public function setAgence(?Agence $agence): self
    {
        $this->agence = $agence;

        return $this;
    }

    /**
     * @return Collection|Compte[]
     */
    public function getComptes(): Collection
    {
        return $this->comptes;
    }

    public function addCompte(Compte $compte): self
    {
        if (!$this->comptes->contains($compte)) {
            $this->comptes[] = $compte;
            $compte->setUser($this);
        }

        return $this;
    }

    public function removeCompte(Compte $compte): self
    {
        if ($this->comptes->removeElement($compte)) {
            // set the owning side to null (unless already changed)
            if ($compte->getUser() === $this) {
                $compte->setUser(null);
            }
        }

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    public function getAvatar()
    {
        if($this->avatar)
        {
            $avatar_str= stream_get_contents($this->avatar);
            return base64_encode($avatar_str);
        }
        return null;
    }

    public function setAvatar($avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): self
    {
        $this->adresse = $adresse;

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
            $transaction->setUserDepot($this);
        }

        return $this;
    }

    public function removeTransaction(Transaction $transaction): self
    {
        if ($this->transactions->removeElement($transaction)) {
            // set the owning side to null (unless already changed)
            if ($transaction->getUserDepot() === $this) {
                $transaction->setUserDepot(null);
            }
        }

        return $this;
    }
}
