<?php

namespace App\Entity;

use App\Entity\Avatar;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AnnonceRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ApiResource(
 * normalizationContext={
 *      "groups"={"annonce_read","media_object_read"}
 * }
 * )
 */
class Annonce
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"annonce_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"annonce_read"})
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Groups({"annonce_read"})
     */
    private $content;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"annonce_read"})
     */
    private $setAt;

    /**
     * @var Avatar|null
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\Avatar")
     * @ORM\JoinColumn()
     * ApiSubresource()
     * @Groups({"annonce_read"})
     */
    public $avatars;
    /**
     * Undocumented function
     * @ORM\PrePersist
     */ 
    public function dddsdad()
    {
        $this->setAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getSetAt(): ?\DateTimeInterface
    {
        return $this->setAt;
    }

    public function setSetAt(?\DateTimeInterface $setAt): self
    {
        $this->setAt = $setAt;

        return $this;
    }
}
