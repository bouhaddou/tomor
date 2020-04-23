<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Post;
use App\Entity\User;
use App\Entity\Image;
use App\Entity\Produit;
use App\Entity\Categorie;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    private $encoder;
    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder=$encoder;
    }
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('FR-fr');

        for( $i=1; $i<=4; $i++)
         { 
             $categorie =new Categorie();
             $content ='<p>' . join('</p><p>',$faker->paragraphs(3)) .'</p>';
             $titre= $faker->sentence();
             $categorie->setTitle($titre)
                         ->setContent($content);
                         $manager->persist($categorie);
         }         
        //      $manager->persist($categorie);
 
        //      for( $k=1; $k<=4; $k++)
        //      {
                
        //          $content ='<p>' . join('</p><p>',$faker->paragraphs(2)) .'</p>';
        //          $produit = new Produit();
        //          $avatar= "http://lorempixel.com/640/480/";
        //          $produit->setRef("prodtuit". $k)
        //                  ->setTitle($faker->slug)
        //                  ->setContent($content)
        //                  ->setPrix(mt_rand(5,20))
        //                  ->setCategorie($categorie)
        //                   ->setAvatar($avatar);
        //                  $manager->persist($produit);
        //                  for( $d=1; $d<=4; $d++)
        //                  {
        //                     $avatar= "http://lorempixel.com/640/480/";
        //                     $image = new Image();
        //                     $image->setPath($avatar)
        //                         ->setCaption("image". $d)
        //                         ->setProduit($produit);
        //                     $manager->persist($image);
        //                  }
        //      } 
            
        //  }
        //  for( $g=1; $g<=10; $g++)
        //  {
        //     $post = new Post();
        //     $content ='<p>' . join('</p><p>',$faker->paragraphs(3)) .'</p>';
        //     $avatar= "http://lorempixel.com/640/480/";
        //     $post->setTitle($faker->slug)
        //             ->setContent($content)
        //             ->setSetAt( new \Datetime())
        //             ->setAvatar($avatar);
           
        //     $manager->persist($post);
        //  }

         for($b=0; $b < 1; $b++)
        { 
          
            $user =new User();
            $chrono = 1;
            $hash = $this->encoder->encodePassword($user,"password");
            $user->setFirstName($faker->firstName)
                 ->setLastName($faker->lastName)
                 ->setPassword($hash)
                 ->setEmail("bihi@gmail.com");
                
            $manager->persist($user);
        }
         

        $manager->flush();
    }
}
