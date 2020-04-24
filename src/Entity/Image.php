<?php
// api/src/Entity/MediaObject.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Controller\CreateImageObjectAction;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ApiResource(
 *     normalizationContext={
 *         "groups"={"media_object_read","post_read"}
 *     },
 *     collectionOperations={
 *         "post"={
*             "path"="/images",
*             "controller"=CreateImageObjectAction::class,
*             "defaults"={"_api_receive"=false}
 *            },
 *         "get"
 *     }
 * )
 * @Vich\Uploadable
 */
 class Image
{
    /**
     * @var int|null
     *
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     * @ORM\Id
     * @Groups({"media_object_read","post_read"})
     */
    protected $id;


    /**
     * @var File|null
     *
     * 
     * @Vich\UploadableField(mapping="images", fileNameProperty="filePath")
     * @Groups({"media_object_read","post_read"})
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
     * @Groups({"media_object_read","post_read"})
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
        return 'images/' . $this->filePath = $filePath;
    }
    public function getFilePah()
    {
        return $this->filePath;
    }
}