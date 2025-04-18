<?php

class User extends Controller
{


    protected function addAdmin()
    {
        $userModel = new UserModes();
        echo json_encode($userModel->addAdmin());
    }

    protected function addClient()
    {
        $userModel = new UserModes();
        echo json_encode($userModel->addClient());
    }

    protected function getAllClients()
    {
        $userModel = new UserModes();
        echo json_encode($userModel->getAllClients());
    }

    protected function login()
    {
        $userModel = new UserModes();
        echo json_encode($userModel->login());
    }

    protected function logout()
    {
        $userModel = new UserModes();
        echo json_encode($userModel->logout());
    }
    protected function getSinleClient()
    {
        $userModel = new UserModes();
        echo json_encode($userModel->getSinleClient());
    }

    protected function ngarkoOfert()
    {
        $userModel = new UserModes();
        echo json_encode($userModel->ngarkoOfert());
    }

    protected function getSingleOfertClinic()
    {
        $userModel = new UserModes();
        echo json_encode($userModel->getSingleOfertClinic());
    }

    protected function deleteOfertSingleClient()
    {
        $userModel = new UserModes();
        echo json_encode($userModel->deleteOfertSingleClient());
    }

    protected function shkarkoCmimet()
    {
        $userModel = new UserModes();
        echo json_encode($userModel->shkarkoCmimet());
    }

    protected function bejPorosi()
    {
        $userModel = new UserModes();
        echo json_encode($userModel->bejPorosi());
    }
    protected function getOrder()
    {
        $userModel = new UserModes();
        echo json_encode($userModel->getOrder());
    }
    protected function getSingleClientFiles()
    {
        $userModel = new UserModes();
        echo json_encode($userModel->getSingleClientFiles());
    }

    protected function deleteClientFile()
    {
        $userModel = new UserModes();
        echo json_encode($userModel->deleteClientFile());
    }
    protected function getProfile()
    {
        $userModel = new UserModes();
        echo json_encode($userModel->getProfile());
    }
    protected function changeGeneralProfile()
    {
        $userModel = new UserModes();
        echo json_encode($userModel->changeGeneralProfile());
    }
    protected function changePassword()
    {
        $userModel = new UserModes();
        echo json_encode($userModel->changePassword());
    }
}
