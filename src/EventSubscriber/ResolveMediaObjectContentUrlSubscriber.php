<?php
// api/src/EventSubscriber/ResolveMediaObjectContentUrlSubscriber.php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Shop;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

 class ResolveMediaObjectContentUrlSubscriber implements EventSubscriberInterface
{
    // /**
    //  * @var 
    //  */
    // private $mailer;
    // // private $repository;
    // public function __construct( \Swift_Mailer $mailer)
    // {
    //     $this->mailer = $mailer;
    //     // $this->repository = $repository;
    // }
    public static function getSubscribedEvents()
    {
        return[
            KernelEvents::VIEW =>['setChronoForInvoce',EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoForInvoce( ViewEvent $event)
    {
        // $shop= $event->getControllerResult();
        // $methode= $event->getRequest()->getMethod();

        // if($shop instanceof Shop && $methode === 'POST')
        // {
          
        //     $message = (new \Swift_Message('Hello Email'))
        //         ->setFrom('brahimbouhaddou12@gmail.com')
        //         ->setTo('bihi1991@gmail.com.com')
        //         ->setBody(
        //             "hello how are you"
        //         );
        //             $mailer->send($message);
        // }
    }

}