<?php
// api/src/Controller/CreateMediaObjectAction.php

namespace App\Controller;

use ApiPlatform\Core\Validator\ValidatorInterface;
use App\Entity\Avatar;
use App\Form\AvatarType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PropertyInfo\Type;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Validator\Exception\ValidatorException;

class CreateMediaObjectAction
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
       $avatar = new Avatar();
       $form = $this->formfactory->create( AvatarType::class, $avatar);
       $form->handleRequest($request);
       if($form->isValid() && $form->isSubmitted())
       {
            $this->entityManager->persist(($avatar));
            $this->entityManager->flush();
            $avatar->setFile(null);
            return $avatar;
       }

       throw new ValidatorException(
           $this->validator->validate($avatar)
       );

     }
}