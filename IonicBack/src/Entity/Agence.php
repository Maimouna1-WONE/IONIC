<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Repository\AgenceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=AgenceRepository::class)
 * @ApiResource (
 *     routePrefix="/agences",
 *      attributes={
 *          "security"="is_granted('ROLE_ADMIN_SYS')",
 *          "security_message"="Vous n'avez pas access à cette Ressource"
 *      },
 *     collectionOperations={
 *             "postAgence"={
 *                      "method"="POST",
 *                      "route_name"="postAgence",
 *     "denormalization_context"={"groups"={"postagence:write"}},
 *                   }
 *     },
 *     itemOperations={
 *              "getUsersAgence"={"method"="GET",
 *                      "path"="/{id}/users",
 *      "requirements"={"id":"\d+"},
 *     "normalization_context"={"groups"={"getuseragence:read"}}},
 *              "deleteUsersAgence"={"method"="DELETE",
 *                      "path"="/{id}",
 *      "requirements"={"id":"\d+"}}
 *  }
 * )
 */
class Agence
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups ({"getuseragence:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups ({"getuseragence:read","postagence:write"})
     * @Assert\NotBlank(message = "Donner le telephone")
     * @Assert\Regex(
     *     pattern="/^3[3|0][0-9]{7}$/",
     *     message="Seuls les operateurs fixe Expresso et Orange sont permis"
     * )
     */
    private $telephone;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups ({"getuseragence:read","postagence:write"})
     * @Assert\NotBlank(message = "Donner le telephone")
     */
    private $adresse;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups ({"getuseragence:read","postagence:write"})
     */
    private $latitude;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups ({"getuseragence:read","postagence:write"})
     */
    private $longitude;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="agence")
     * @ApiSubresource ()
     * @Groups ({"getuseragence:read","postagence:write"})
     */
    private $users;

    /**
     * @ORM\Column(name="statut", type="boolean", options={"default":false})
     */
    private $statut = false;

    /**
     * @ORM\OneToOne(targetEntity=Compte::class, cascade={"persist", "remove"})
     * @Groups ({"postagence:write"})
     */
    private $compte;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(float $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(float $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->setAgence($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getAgence() === $this) {
                $user->setAgence(null);
            }
        }

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

    public function getCompte(): ?Compte
    {
        return $this->compte;
    }

    public function setCompte(?Compte $compte): self
    {
        $this->compte = $compte;

        return $this;
    }
}
