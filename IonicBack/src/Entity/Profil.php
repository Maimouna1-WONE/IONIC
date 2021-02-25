<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use App\Repository\ProfilRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=ProfilRepository::class)
 * @ApiFilter(BooleanFilter::class, properties={"statut"})
 * @ApiResource (
 *     routePrefix="/profils",
 *     attributes={
 *          "security"="is_granted('ROLE_ADMIN_SYS')",
 *          "security_message"="Vous n'avez pas access à cette Ressource"
 *      },
 *     collectionOperations={
 *                 "postProfil"={
 *                      "method"="POST",
 *                      "path"="",
 *     "denormalization_context"={"groups"={"postprofil:write"}}
 *                   },
 *               "getProfils"={"method"="GET",
 *                      "path"="",
 *     "normalization_context"={"groups"={"getprofil:read"}}}
 *     },
 *     itemOperations={
 *              "getId"={"method"="GET",
 *                      "path"="/{id}",
 *      "requirements"={"id":"\d+"},
 *     "normalization_context"={"groups"={"getprofil:read"}}},
 *     "getUsersByProfil"={"method"="GET",
 *                      "path"="/{id}/users",
 *      "requirements"={"id":"\d+"},
 *     "normalization_context"={"groups"={"getusersprofil:read"}}},
 *              "putProfil"={"method"="PUT",
 *                      "path"="/{id}",
 *     "denormalization_context"={"groups"={"postprofil:write"}}},
 *              "delete"={"method"="DELETE",
 *                          "path"="/{id}",
 *                          "requirements"={"id":"\d+"}}
 *  }
 * )
 */
class Profil
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups ({"getuser:read","getprofil:read","getusersprofil:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message = "Donner le libelle du profil")
     * @Groups ({"getuser:read","postprofil:write","getprofil:read","getusersprofil:read"})
     */
    private $libelle;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="profil")
     * @Groups ({"getusersprofil:read"})
     * @ApiSubresource()
     */
    private $users;

    /**
     * @ORM\Column(name="statut", type="boolean", options={"default":false})
     */
    private $statut = false;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLibelle(): ?string
    {
        return $this->libelle;
    }

    public function setLibelle(string $libelle): self
    {
        $this->libelle = $libelle;

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
            $user->setProfil($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getProfil() === $this) {
                $user->setProfil(null);
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
}
