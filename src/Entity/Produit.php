<?php

namespace App\Entity;

use App\Entity\Avatar;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\PrePersist;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProduitRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"produit_read","shops_read","media_object_read"}
 * }
 *
 * )
 */
class Produit
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"produit_read","shops_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="le réference de produit ne doit pas être vide")
     * @Groups({"produit_read","shops_read"})
     */
    private $ref;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"produit_read","shops_read"})
     * @Assert\NotBlank(message="le titre de produit ne doit pas être vide")
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"produit_read","shops_read"})
     * @Assert\NotBlank(message="la description  de produit ne doit pas être vide")
     */
    private $content;

    /**
     * @ORM\Column(type="float")
     * @Groups({"produit_read","shops_read"})
     * @Assert\NotBlank(message="le prix de produit ne doit pas être vide")
     */
    private $prix;
   
    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"produit_read","shops_read"})
     */
    private $observation;


    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Shop", mappedBy="produit")
     * @Groups({"produit_read"})
     */
    private $shops;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Categorie", inversedBy="produits")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"produit_read","shops_read"})
     */
    private $Categorie;

    /**
     * @var Avatar|null
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\Avatar")
     * @ORM\JoinColumn()
     * ApiSubresource()
     * @Groups({"produit_read","shops_read"})
     */
    public $avatars;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $setDATE;

    /**
     * @ORM\PrePersist
     */
    public function dddsdad()
    {
        $this->setDATE = new \DateTime();
    }


    public function __construct()
    {
        $this->shops = new ArrayCollection();
        $this->avatars = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRef(): ?string
    {
        return $this->ref;
    }

    public function setRef(string $ref): self
    {
        $this->ref = $ref;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getPrix(): ?float
    {
        return $this->prix;
    }

    public function setPrix(float $prix): self
    {
        $this->prix = $prix;

        return $this;
    }


    public function getObservation(): ?string
    {
        return $this->observation;
    }

    public function setObservation(?string $observation): self
    {
        $this->observation = $observation;

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
            $shop->setProduit($this);
        }

        return $this;
    }

    public function removeShop(Shop $shop): self
    {
        if ($this->shops->contains($shop)) {
            $this->shops->removeElement($shop);
            // set the owning side to null (unless already changed)
            if ($shop->getProduit() === $this) {
                $shop->setProduit(null);
            }
        }

        return $this;
    }

    public function getCategorie(): ?Categorie
    {
        return $this->Categorie;
    }

    public function setCategorie(?Categorie $Categorie): self
    {
        $this->Categorie = $Categorie;

        return $this;
    }


    public function getSetDATE(): ?\DateTimeInterface
    {
        return $this->setDATE;
    }

    public function setSetDATE(?\DateTimeInterface $setDATE): self
    {
        $this->setDATE = $setDATE;

        return $this;
    }


    /**
     * @return Collection|Avatar[]
     */
    public function getAvatars(): Collection
    {
        return $this->avatars;
    }

    public function addAvatar(Avatar $avatar)
    {
            $this->avatars->add($avatar);

    }
    public function removeAvatar(Avatar $avatar)
    {
            $this->avatars->removeElement($avatar);

    }



}
