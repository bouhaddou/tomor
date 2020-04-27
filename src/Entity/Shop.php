<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ShopRepository")
 * @ApiResource(
 *     normalizationContext={"groups"={"shops_read","client_read"}}
 *  
 * )
 */
class Shop
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"shops_read","client_read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Produit", inversedBy="shops")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"shops_read","client_read"})
     */
    private $produit;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Client", inversedBy="shops")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"shops_read"})
     */
    private $client;

    /**
     * @ORM\Column(type="float")
     * @Groups({"shops_read","client_read"})
     */
    private $Quantity;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="merci de coucher le type de Régelement")
     * @Groups({"shops_read","client_read"})
     */
    private $type;

    /**
     * @ORM\Column(type="boolean")
     * @Assert\NotBlank(message="les conditions génerale ne sont pas accepter")
     * @Groups({"shops_read","client_read"})
     */
    private $status;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"shops_read","client_read"})
     */
    private $delivery;



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProduit(): ?Produit
    {
        return $this->produit;
    }

    public function setProduit(?Produit $produit): self
    {
        $this->produit = $produit;

        return $this;
    }

    public function getClient(): ?Client
    {
        return $this->client;
    }

    public function setClient(?Client $client): self
    {
        $this->client = $client;

        return $this;
    }

    public function getQuantity(): ?float
    {
        return $this->Quantity;
    }

    public function setQuantity(float $Quantity): self
    {
        $this->Quantity = $Quantity;

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



    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getDelivery(): ?string
    {
        return $this->delivery;
    }

    public function setDelivery(?string $delivery): self
    {
        $this->delivery = $delivery;

        return $this;
    }
}
