<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ClientRepository")
 * @ApiResource(
 *    normalizationContext={"groups"={"client_read","shops_read"}}
 * )
 */
class Client
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"shops_read","client_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Merci de Entreé Votre Prénom ")
     * @Groups({"shops_read","client_read"})
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Merci de Entreé Votre Nom ")
     * @Groups({"shops_read","client_read"})
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Merci de Entreé Votre email ")
     * @Assert\Email(
     *     message = "L'email '{{ value }}' n'est pas un email valide."
     * )
     * @Groups({"shops_read","client_read"})
     */
    private $email;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Assert\NotBlank(message="Merci de Entreé Votre Adresse  ")
     * @Groups({"shops_read","client_read"})
     */
    private $adress;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"shops_read","client_read"})
     */
    private $password;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Shop", mappedBy="client")
     * @ApiSubresource()
     */
    private $shops;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"shops_read","client_read"})
     */
    private $company;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Merci de Entreé Votre numéro de téléphone ")
     * @Groups({"shops_read","client_read"})
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"shops_read","client_read"})
     */
    private $paye;

    /**
     * @ORM\Column(type="string")
     * @Groups({"shops_read","client_read"})
     */
    private $postal;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Merci de Entreé Votre Ville ")
     * @Groups({"shops_read","client_read"})
     */
    private $city;

 
    public function __construct()
    {
        $this->shops = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
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

    public function getAdress(): ?string
    {
        return $this->adress;
    }

    public function setAdress(?string $adress): self
    {
        $this->adress = $adress;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @return Collection|Shop[]
     */
    public function getShops(): Collection
    {
        return $this->shops;
    }

    public function addShop(Shop $shop): self
    {
        if (!$this->shops->contains($shop)) {
            $this->shops[] = $shop;
            $shop->setClient($this);
        }

        return $this;
    }

    public function removeShop(Shop $shop): self
    {
        if ($this->shops->contains($shop)) {
            $this->shops->removeElement($shop);
            // set the owning side to null (unless already changed)
            if ($shop->getClient() === $this) {
                $shop->setClient(null);
            }
        }

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(?string $company): self
    {
        $this->company = $company;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getPaye(): ?string
    {
        return $this->paye;
    }

    public function setPaye(string $paye): self
    {
        $this->paye = $paye;

        return $this;
    }

    public function getPostal()
    {
        return $this->postal;
    }

    public function setPostal( $postal): self
    {
        $this->postal = $postal;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    
}
