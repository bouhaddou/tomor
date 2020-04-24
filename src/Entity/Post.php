<?php

namespace App\Entity;

use App\Entity\Image;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\PrePersist;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\PostRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"post_read","media_object_read"}
 * }
 *
 * )
 */
class Post
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"post_read","media_object_read"})
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Groups({"post_read","media_object_read"})
     */
    private $content;

    /**
     * @var Image|null
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\Image")
     * @ORM\JoinColumn()
     * ApiSubresource()
     * @Groups({"post_read"})
     */
    public $images;

    /**
     * @ORM\Column(type="date")
     * @Groups({"post_read","media_object_read"})
     */
    private $setAt;

    /**
     * @ORM\PrePersist
     */
    public function dddsdad()
    {
        $this->setAt = new \DateTime();
    }

    public function __construct()
    {
        $this->images = new ArrayCollection();
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

    public function setSetAt(\DateTimeInterface $setAt): self
    {
        $this->setAt = $setAt;
        return $this;
    }

        /**
     * @return Collection|Image[]
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addAvatar(Image $image)
    {
            $this->images->add($image);

    }
    public function removeImage(Image $image)
    {
            $this->images->removeElement($image);

    }
    
}
