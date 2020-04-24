<?php
// api/src/Controller/CreateMediaObjectAction.php

namespace App\Controller;

use App\Entity\Image;
use App\Form\ImageType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\FormFactoryInterface;
use ApiPlatform\Core\Validator\ValidatorInterface;
use Symfony\Component\Validator\Exception\ValidatorException;

class CreateImageObjectAction
{
    /**
     * @var FormFactoryInterface
     */
    private $formfactory;

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    
    /**
     * @var ValidatorInterface
     */
    private $validator;
    
    public function __construct( ValidatorInterface $validator,FormFactoryInterface $formfactory, EntityManagerInterface $entityManager)
    {
        $this->formfactory = $formfactory;
        $this->entityManager = $entityManager;
        $this->validator = $validator;
    }


    public function __invoke(Request $request)
    {
       $Image = new Image();
       $form = $this->formfactory->create( ImageType::class, $Image);
       $form->handleRequest($request);
       if($form->isValid() && $form->isSubmitted())
       {
            $this->entityManager->persist(($Image));
            $this->entityManager->flush();
            $Image->setFile(null);
            return $Image;
       }

       throw new ValidatorException(
           $this->validator->validate($Image)
       );
        
     }
}