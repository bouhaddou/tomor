<?php
// api/src/Entity/MediaObject.php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\CreateMediaObjectAction;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity
 * @ApiResource(
 *     normalizationContext={
 *         "groups"={"media_object_read"}
 *     },
 *     collectionOperations={
 *         "post"={
*             "path"="/avatars",
*             "controller"=CreateMediaObjectAction::class,
*             "defaults"={"_api_receive"=false}
 *            },
 *         "get"
 *     }
 * )
 * @Vich\Uploadable
 */
 class Avatar
{
    /**
     * @var int|null
     *
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     * @ORM\Id
     * @Groups({"media_object_read","media_object","shops_read"})
     */
    protected $id;


    /**
     * @var File|null
     *
     * 
     * @Vich\UploadableField(mapping="avatars", fileNameProperty="filePath")
     * @Groups({"media_object_read","media_object","shops_read"})
     * @Assert\NotBlank(message="Aucune image n'a été trouvée")
     * @Assert\File(
     *     maxSize = "3072k",
     *     mimeTypes = {"image/jpeg", "image/png"},
     *     mimeTypesMessage = "Please upload a valid Image"
     * )
     */
    public $file;

    /**
     * @var string|null
     *
     * @ORM\Column(nullable=true)
     * @Groups({"media_object_read","media_object","shops_read"})
     */
    public $filePath;



    public function getId(): ?int
    {
        return $this->id;
    }

    public function setFile($file)
    {
        return $this->file = $file;
    }
    public function geFile()
    {
        return $this->file;
    }
    public function setFilePah($filePath)
    {
        return 'avatars/' . $this->filePath = $filePath;
    }
    public function getFilePah()
    {
        return $this->filePath;
    }
}