<?php

class UserModes extends Model
{

    public function getProfile()
    {
        $data = json_decode(file_get_contents("php://input"));

        $get_profile_query = "SELECT * FROM `user` WHERE user.id=:id";
        $get_profile_stmt = $this->dbh->prepare($get_profile_query);
        $get_profile_stmt->bindValue(":id", $data->id, PDO::PARAM_INT);
        $get_profile_stmt->execute();
        $results = $get_profile_stmt->fetchAll(PDO::FETCH_ASSOC);
        $return_results = array();

        foreach ($results as $result) {
            $single = [
                "emer" => $result['emer'],
                "mbiemer" => $result['mbiemer'],
                "telefon" => $result['telefon'],
                "emri_biznesit" => $result['emri_biznesit'],
                "email" => $result['email'],
                "qyteti" => $result['qyteti'],
                "nipt" => $result['nipt'],
                "adresa" => $result['adresa']
            ];
            array_push($return_results, $single);
        }

        return $return_results;
    }

    public function changeGeneralProfile()
    {

        $data = json_decode(file_get_contents("php://input"));

        $change_profile_query = "UPDATE `user` SET 
            user.emer=:emer,
            user.mbiemer=:mbiemer,
            user.telefon=:telefon,
            user.emri_biznesit=:emri_biznesit,
            user.email=:email,
            user.adresa=:adresa,
            user.qyteti=:qyteti,
            user.nipt=:nipt
            WHERE user.id=:id
         ";
        $change_profile_stmt = $this->dbh->prepare($change_profile_query);
        $change_profile_stmt->bindValue(":id", $data->id, PDO::PARAM_INT);
        $change_profile_stmt->bindValue(":emer", $data->emer, PDO::PARAM_STR);
        $change_profile_stmt->bindValue(":mbiemer", $data->mbiemer, PDO::PARAM_STR);
        $change_profile_stmt->bindValue(":telefon", $data->telefon, PDO::PARAM_STR);
        $change_profile_stmt->bindValue(":emri_biznesit", $data->emri_biznesit, PDO::PARAM_STR);
        $change_profile_stmt->bindValue(":email", $data->email, PDO::PARAM_STR);
        $change_profile_stmt->bindValue(":adresa", $data->adresa, PDO::PARAM_STR);
        $change_profile_stmt->bindValue(":qyteti", $data->qyteti, PDO::PARAM_STR);
        $change_profile_stmt->bindValue(":nipt", $data->nipt, PDO::PARAM_STR);

        if ($change_profile_stmt->execute()) {
            return $msg = [
                "status" => 1,
                "message" => "Profili u ndryshua"
            ];
        } else {
            return $msg = [
                "status" => 0,
                "message" => "Profili nuk u ndryshua"
            ];
        }
    }

    public function changePassword()
    {
        $data = json_decode(file_get_contents("php://input"));
        $msg = [];

        if (!empty($data->newPassword) && !empty($data->oldPassword)) {
            $get_user_query = "SELECT * FROM `user` WHERE user.id=:id";
            $get_user_stmt = $this->dbh->prepare($get_user_query);
            $get_user_stmt->bindValue(":id", $data->id, PDO::PARAM_INT);
            $get_user_stmt->execute();

            if ($get_user_stmt->rowCount()) {

                $row = $get_user_stmt->fetch(PDO::FETCH_ASSOC);
                $check_password = password_verify($data->oldPassword, $row['password']);

                if ($check_password) {

                    $update_password_query = "UPDATE `user` SET user.password=:new_password WHERE user.id=:id";
                    $update_password_stmt = $this->dbh->prepare($update_password_query);
                    $update_password_stmt->bindValue(":new_password", password_hash($data->newPassword, PASSWORD_DEFAULT), PDO::PARAM_STR);
                    $update_password_stmt->bindValue(":id", $data->id, PDO::PARAM_INT);

                    if ($update_password_stmt->execute()) {
                        return $msg = [
                            "status" => 1,
                            "message" => "Passwordi u ndryshua"
                        ];
                    } else {
                        return $msg = [
                            "status" => 0,
                            "message" => "Passwordi nuk u ndryshua"
                        ];
                    }
                } else {
                    return $msg = [
                        "status" => 0,
                        "message" => "Passwordi i vjeter nuk eshte i sakte"
                    ];
                }
            }
        } else {
            return $msg = [
                "status" => 0,
                "message" => "Plotesoni te gjitha fushat"
            ];
        }
    }

    public function login()
    {

        $data = json_decode(file_get_contents("php://input"));
        $msg = [];


        if (!empty($data->username) && !empty($data->password)) {

            $login_query = "SELECT * FROM `user` WHERE user.username=:username";
            $login_stmt = $this->dbh->prepare($login_query);
            $login_stmt->bindValue(":username", $data->username, PDO::PARAM_STR);
            $login_stmt->execute();

            if ($login_stmt->rowCount()) {

                $generatedToken = md5(openssl_random_pseudo_bytes(32));
                $row = $login_stmt->fetch(PDO::FETCH_ASSOC);

                $check_password = password_verify($data->password, $row['password']);
                $change_token_query = "UPDATE `user` SET user.token=:token WHERE  user.id=" . $row['id'] . " ";
                $change_token_stmt = $this->dbh->prepare($change_token_query);
                $change_token_stmt->bindValue(":token", $generatedToken, PDO::PARAM_STR);
                $change_token_stmt->execute();

                if ($row['status'] === 0) {
                    return $msg = [
                        "status" => 0,
                        "message" => "Perdoruesi nuk ekziston"
                    ];
                }

                if ($check_password) {
                    return $msg = [
                        'status' => 1,
                        'message' => 'Hyrje me sukses!',
                        'token' => $generatedToken,
                        'role' => $row['role'] * 1,
                        'id' => $row['id'] * 1
                    ];
                } else {
                    return $msg = [
                        'status' => 0,
                        'message' => "Username ose password gabim"
                    ];
                }
            } else {
                return $msg = [
                    'status' => 0,
                    'message' => "Username ose password gabim"
                ];
            }
        } else {
            return $msg = [
                'status' => 0,
                'message' => 'Njera nga fushat ose te dyja jan bosh!!!'
            ];
        }
    }


    public function logout()
    {

        $data = json_decode(file_get_contents("php://input"));
        $msg = [];

        $logout_query = "UPDATE `user` SET user.token=:token WHERE  user.id=:user_id ";
        $logout_stmt = $this->dbh->prepare($logout_query);
        $logout_stmt->bindValue(":user_id", $data->user_id, PDO::PARAM_INT);
        $logout_stmt->bindValue(":token", md5(openssl_random_pseudo_bytes(32)), PDO::PARAM_STR);

        if ($logout_stmt->execute()) {
            return $msg = [
                "status" => 1
            ];
        } else {
            return $msg = [
                "status" =>  0
            ];
        }
    }


    public function addAdmin()
    {

        $data = json_decode(file_get_contents("php://input"));
        $msg = [];

        if (
            !empty($data->username) &&
            !empty($data->password) &&
            !empty($data->emer) &&
            !empty($data->mbiemer) &&
            !empty($data->telefon) &&
            !empty($data->emri_biznesit) &&
            !empty($data->email) &&
            !empty($data->adresa) &&
            !empty($data->qyteti)

        ) {

            $add_admin_query = 'INSERT INTO `user` SET 
                username=:username,
                password=:password,
                emer=:emer,
                mbiemer=:mbiemer,
                telefon=:telefon,
                emri_biznesit=:emri_biznesit,
                email=:email,
                adresa=:adresa,
                qyteti=:qyteti,
                nipt=:nipt,
                status=1,
                token=:token,
                role=1
                ';
            $add_admin_stmt = $this->dbh->prepare($add_admin_query);
            $add_admin_stmt->bindValue(":username", $data->username, PDO::PARAM_STR);
            $add_admin_stmt->bindValue(":password", password_hash($data->password, PASSWORD_DEFAULT), PDO::PARAM_STR);
            $add_admin_stmt->bindValue(":emer", $data->emer, PDO::PARAM_STR);
            $add_admin_stmt->bindValue(":mbiemer", $data->mbiemer, PDO::PARAM_STR);
            $add_admin_stmt->bindValue(":telefon", $data->telefon, PDO::PARAM_STR);
            $add_admin_stmt->bindValue(":emri_biznesit", $data->emri_biznesit, PDO::PARAM_STR);
            $add_admin_stmt->bindValue(":email", $data->email, PDO::PARAM_STR);
            $add_admin_stmt->bindValue(":adresa", $data->adresa, PDO::PARAM_STR);
            $add_admin_stmt->bindValue(":qyteti", $data->qyteti, PDO::PARAM_STR);
            $add_admin_stmt->bindValue(":nipt", $data->nipt, PDO::PARAM_STR);
            $add_admin_stmt->bindValue(":token", md5(openssl_random_pseudo_bytes(32)), PDO::PARAM_STR);


            if ($add_admin_stmt->execute()) {

                return $msg = [
                    'status' => 1,
                    'message' => "Admini u shtua"
                ];
            } else {
                return $msg = [
                    'status' => 0,
                    'message' => "Admini nuk u shtua"
                ];
            }
        } else {
            return $msg = [
                'status' => 0,
                'message' => "Plotesoni te gjitha fushat"
            ];
        }
    }



    public function addClient()
    {
        $data = json_decode(file_get_contents("php://input"));
        $msg = [];

        if (
            !empty($data->username) &&
            !empty($data->password) &&
            !empty($data->emer) &&
            !empty($data->mbiemer) &&
            !empty($data->telefon) &&
            !empty($data->emri_biznesit) &&
            !empty($data->email) &&
            !empty($data->adresa) &&
            !empty($data->qyteti)

        ) {

            $check_username_query = "SELECT username FROM `user`";
            $check_username_stmt = $this->dbh->prepare($check_username_query);
            $check_username_stmt->execute();
            $results = $check_username_stmt->fetchAll(PDO::FETCH_COLUMN);


            if (in_array($data->username, $results)) {
                return $msg  = [
                    "status" => 0,
                    "message" => "Username ekziston,ju lutemi perdorni nje tjeter username!"
                ];
            } else {
                $add_admin_query = 'INSERT INTO `user` SET 
                username=:username,
                password=:password,
                emer=:emer,
                mbiemer=:mbiemer,
                telefon=:telefon,
                emri_biznesit=:emri_biznesit,
                email=:email,
                adresa=:adresa,
                qyteti=:qyteti,
                nipt=:nipt,
                status=1,
                token=:token,
                role=2
                ';
                $add_admin_stmt = $this->dbh->prepare($add_admin_query);
                $add_admin_stmt->bindValue(":username", $data->username, PDO::PARAM_STR);
                $add_admin_stmt->bindValue(":password", password_hash($data->password, PASSWORD_DEFAULT), PDO::PARAM_STR);
                $add_admin_stmt->bindValue(":emer", $data->emer, PDO::PARAM_STR);
                $add_admin_stmt->bindValue(":mbiemer", $data->mbiemer, PDO::PARAM_STR);
                $add_admin_stmt->bindValue(":telefon", $data->telefon, PDO::PARAM_STR);
                $add_admin_stmt->bindValue(":emri_biznesit", $data->emri_biznesit, PDO::PARAM_STR);
                $add_admin_stmt->bindValue(":email", $data->email, PDO::PARAM_STR);
                $add_admin_stmt->bindValue(":adresa", $data->adresa, PDO::PARAM_STR);
                $add_admin_stmt->bindValue(":qyteti", $data->qyteti, PDO::PARAM_STR);
                $add_admin_stmt->bindValue(":nipt", $data->nipt, PDO::PARAM_STR);
                $add_admin_stmt->bindValue(":token", md5(openssl_random_pseudo_bytes(32)), PDO::PARAM_STR);


                if ($add_admin_stmt->execute()) {

                    return $msg = [
                        'status' => 1,
                        'message' => "Klienti u shtua"
                    ];
                } else {
                    return $msg = [
                        'status' => 0,
                        'message' => "Klienti nuk u shtua"
                    ];
                }
            }
        } else {
            return $msg = [
                'status' => 0,
                'message' => "Plotesoni te gjitha fushat"
            ];
        }
    }


    public function getAllClients()
    {

        $get_all_clients_query = "SELECT * FROM `user` WHERE user.role = 2";
        $get_all_clients_stmt = $this->dbh->prepare($get_all_clients_query);
        $get_all_clients_stmt->execute();
        $results = $get_all_clients_stmt->fetchAll(PDO::FETCH_ASSOC);
        $return_results = array();

        foreach ($results as $result) {

            $single = [

                "id" => $result['id'] * 1,
                "username" => $result['username'],
                "emer" => $result['emer'],
                "mbiemer" => $result['mbiemer'],
                "telefon" => $result['telefon'],
                "emri_biznesit" => $result['emri_biznesit'],
                "email" => $result['email'],
                "adresa" => $result['adresa'],
                "qyteti" => $result['qyteti'],
                "nipt" => $result['nipt'],
            ];

            array_push($return_results, $single);
        }

        return $return_results;
    }


    public function getSinleClient()
    {

        $data = json_decode(file_get_contents("php://input"));

        $get_single_client_query = "SELECT * FROM `user` WHERE user.id=:user_id";
        $get_single_client_stmt = $this->dbh->prepare($get_single_client_query);
        $get_single_client_stmt->bindValue(":user_id", $data->user_id, PDO::PARAM_INT);
        $get_single_client_stmt->execute();
        $results = $get_single_client_stmt->fetchAll(PDO::FETCH_ASSOC);
        $return_results = array();

        foreach ($results as $result) {

            $single = [

                "id" => $result['id'] * 1,
                "username" => $result['username'],
                "emer" => $result['emer'],
                "mbiemer" => $result['mbiemer'],
                "telefon" => $result['telefon'],
                "emri_biznesit" => $result['emri_biznesit'],
                "email" => $result['email'],
                "adresa" => $result['adresa'],
                "qyteti" => $result['qyteti'],
                "nipt" => $result['nipt'],

            ];
            array_push($return_results, $single);
        }


        return $return_results;
    }


    public function ngarkoOfert()
    {

        $data = $_POST;
        $imageFolder = "./files/";
        $msg = [];

        $filetowrite = $imageFolder . $data["filename"] . '.' . $data["type"];



        if (file_exists($filetowrite)) {
            $increment = 0;
            while (file_exists($filetowrite)) {
                $increment++;
                $filetowrite = $imageFolder . $data["filename"] . '(' . $increment . ')' . '.' . $data["type"];
            }
        }


        list($path, $ext, $name) = explode('/', $filetowrite);


        $ngarko_doc_query = "INSERT INTO `ofertat` SET klient_id=:klient_id , file_name=:file_name";
        $ngarko_doc_stmt = $this->dbh->prepare($ngarko_doc_query);
        $ngarko_doc_stmt->bindValue(":klient_id", $data["klient_id"], PDO::PARAM_INT);
        $ngarko_doc_stmt->bindValue(":file_name", $name, PDO::PARAM_STR);



        if ($ngarko_doc_stmt->execute()) {
            move_uploaded_file($_FILES["file"]["tmp_name"], $filetowrite);

            return $msg = [
                "status" => 1,
                "message" => "Dokumenti u ngarkua"
            ];
        } else {

            return $msg = [
                "status" => 0,
                "message" => "Dokumenti nuk u ngarkua"
            ];
        }
    }

    public function getSingleOfertClinic()
    {

        $data = json_decode(file_get_contents("php://input"));

        $get_singleofert_query = "SELECT * FROM `ofertat` WHERE ofertat.klient_id=:klient_id";
        $get_singleofert_stmt = $this->dbh->prepare($get_singleofert_query);
        $get_singleofert_stmt->bindValue(":klient_id", $data->klient_id, PDO::PARAM_INT);
        $get_singleofert_stmt->execute();
        $results = $get_singleofert_stmt->fetchAll(PDO::FETCH_ASSOC);
        $return_results = array();

        foreach ($results as $result) {
            $single = [
                "id" => $result['id'] * 1,
                "file_name" => $result['file_name'],
            ];
            array_push($return_results, $single);
        }

        return $return_results;
    }

    public function deleteOfertSingleClient()
    {

        $data = json_decode(file_get_contents("php://input"));
        $msg = [];

        $delete_singleofert_query = "DELETE FROM `ofertat` WHERE ofertat.id=:oferta_id";
        $delete_singleofert_stmt = $this->dbh->prepare($delete_singleofert_query);
        $delete_singleofert_stmt->bindValue(":oferta_id", $data->oferta_id, PDO::PARAM_INT);

        if ($delete_singleofert_stmt->execute()) {
            return $msg = [
                "status" => 1,
                "message" => "Dokumenti u fshi!"
            ];
        } else {
            return $msg = [
                "status" => 0,
                "message" => "Dokumenti nuk u fshi!"
            ];
        }
    }

    public function shkarkoCmimet()
    {

        $data = json_decode(file_get_contents("php://input"));

        $shkarko_cmime_query = "SELECT * FROM `ofertat` WHERE ofertat.klient_id=:klient_id  ORDER BY `ofertat`.`created_at` DESC";
        $shkarko_cmime_stmt = $this->dbh->prepare($shkarko_cmime_query);
        $shkarko_cmime_stmt->bindValue(":klient_id", $data->klient_id, PDO::PARAM_INT);
        $shkarko_cmime_stmt->execute();
        $results  = $shkarko_cmime_stmt->fetchAll(PDO::FETCH_ASSOC);
        $return_results = array();

        foreach ($results as $result) {
            $single = [
                "id" => $result['id'] * 1,
                "file" => $result['file_name']
            ];

            array_push($return_results, $single);
        }

        return $return_results;
    }

    public function bejPorosi()
    {

        $data = $_POST;
        $data_sot =  date('Y-m-d');
        $msg = [];
        $imageFolder = "./files/";



        $filetowrite = $imageFolder . $data["filename"] . '.' . $data["type"];



        if (file_exists($filetowrite)) {
            $increment = 0;
            while (file_exists($filetowrite)) {
                $increment++;
                $filetowrite = $imageFolder . $data["filename"] . '(' . $increment . ')' . '.' . $data["type"];
            }
        }


        list($path, $ext, $name) = explode('/', $filetowrite);


        $check_date_query = "SELECT * FROM `porosit` WHERE porosit.date=:data_sot AND porosit.klient_id=:klient_id ";
        $check_date_stmt  = $this->dbh->prepare($check_date_query);
        $check_date_stmt->bindValue(":data_sot", $data_sot, PDO::PARAM_STR);
        $check_date_stmt->bindValue(":klient_id", $data['klient_id'], PDO::PARAM_INT);
        $check_date_stmt->execute();

        if ($check_date_stmt->rowCount()) {
            $row = $check_date_stmt->fetch(PDO::FETCH_ASSOC);
            $date_id = $row['id'];

            $add_neworder_query = "INSERT INTO `porosit_details` SET porosi_id=:porosi_id , file_name=:file_name ";
            $add_neworder_stmt = $this->dbh->prepare($add_neworder_query);
            $add_neworder_stmt->bindValue(":porosi_id", $date_id, PDO::PARAM_INT);
            $add_neworder_stmt->bindValue(":file_name", $name, PDO::PARAM_STR);

            if ($add_neworder_stmt->execute()) {

                move_uploaded_file($_FILES["file"]["tmp_name"], $filetowrite);

                return $msg = [
                    "status" => 1,
                    "message" => "Porosia u shtua"
                ];
            } else {
                return $msg = [
                    "status" => 0,
                    "message" => "Porosia nuk u shtua"
                ];
            }
        } else {
            $add_newdate_query = "INSERT INTO `porosit` SET  date=:data_sot,klient_id=:klient_id";
            $add_newdate_stmt = $this->dbh->prepare($add_newdate_query);
            $add_newdate_stmt->bindValue(":data_sot", $data_sot, PDO::PARAM_STR);
            $add_newdate_stmt->bindValue(":klient_id", $data['klient_id'], PDO::PARAM_STR);

            if ($add_newdate_stmt->execute()) {

                $last_id = $this->dbh->lastInsertId();

                $add_orderdetails_quey = "INSERT INTO `porosit_details` SET porosi_id=:porosi_id , file_name=:file_name ";
                $add_orderdetails_stmt = $this->dbh->prepare($add_orderdetails_quey);
                $add_orderdetails_stmt->bindValue(":porosi_id", $last_id, PDO::PARAM_INT);
                $add_orderdetails_stmt->bindValue(":file_name", $name, PDO::PARAM_STR);

                if ($add_orderdetails_stmt->execute()) {

                    move_uploaded_file($_FILES["file"]["tmp_name"], $filetowrite);

                    return $msg = [
                        "status" => 1,
                        "message" => "Porosia u shtua"
                    ];
                } else {
                    return $msg = [
                        "status" => 0,
                        "message" => "Porosia nuk u shtua"
                    ];
                }
            }
        }
    }

    public function getOrder()
    {

        $data = json_decode(file_get_contents("php://input"));

        if (isset($data->klient_id)) {

            $get_order_query =
                "SELECT   * FROM `porosit` WHERE porosit.klient_id=:klient_id ORDER BY `porosit`.`id` DESC ";
            $get_order_stmt = $this->dbh->prepare($get_order_query);
            $get_order_stmt->bindValue(":klient_id", $data->klient_id, PDO::PARAM_INT);
            $get_order_stmt->execute();
            $results = $get_order_stmt->fetchAll(PDO::FETCH_ASSOC);
            $return_results = array();
            foreach ($results as $result) {

                $single = [];
                $file_order_query =
                    "SELECT porosit_details.file_name 
                FROM `porosit_details` 
                WHERE porosit_details.porosi_id=:porosi_id 
                ORDER BY `porosit_details`.`id` DESC";
                $file_order_stmt = $this->dbh->prepare($file_order_query);
                $file_order_stmt->bindValue(":porosi_id", $result['id'], PDO::PARAM_INT);
                $file_order_stmt->execute();
                $files = $file_order_stmt->fetchAll(PDO::FETCH_ASSOC);
                $single = ["date" => $result['date'], "id" => $result['id'] * 1];
                $single['files'] = $files;
                array_push($return_results, $single);
            }

            return $return_results;
        }
    }

    public function getSingleClientFiles()
    {

        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->klient_id) && !empty($data->porosi_id)) {

            $get_clientfiles_query =
                "SELECT porosit.id as porosit_id, porosit_details.*, porosit_details.id as porosi_id FROM `porosit` LEFT JOIN `porosit_details`
            ON porosit.id = porosit_details.porosi_id
            WHERE porosit.klient_id=:klient_id AND porosit_details.porosi_id=:porosi_id ";
            $get_clientfiles_stmt = $this->dbh->prepare($get_clientfiles_query);
            $get_clientfiles_stmt->bindValue(":klient_id", $data->klient_id, PDO::PARAM_INT);
            $get_clientfiles_stmt->bindValue(":porosi_id", $data->porosi_id, PDO::PARAM_INT);
            $get_clientfiles_stmt->execute();
            $results = $get_clientfiles_stmt->fetchAll(PDO::FETCH_ASSOC);
            $return_results = array();

            foreach ($results as $result) {

                $single = [
                    "id" => $result['porosi_id'] * 1,
                    "file" => $result['file_name'],
                    "porosi_id" => $result['porosit_id'] * 1
                ];

                array_push($return_results, $single);
            }

            return $return_results;
        } else {
            // header($_SERVER["SERVER_PROTOCOL"] . ' 500 Internal Server Error', true, 500);
            // echo 'Something went wrong!';
            // exit;
        }
    }

    public function deleteClientFile()
    {

        $data = json_decode(file_get_contents("php://input"));
        $msg = [];

        $delete_file_query = "DELETE FROM `porosit_details` WHERE porosit_details.id=:porosi_id";
        $delete_file_stmt = $this->dbh->prepare($delete_file_query);
        $delete_file_stmt->bindValue(":porosi_id", $data->porosi_id, PDO::PARAM_INT);

        if ($delete_file_stmt->execute()) {

            $delete_all_query = "SELECT * FROM `porosit_details` WHERE  porosit_details.porosi_id=:id";
            $delete_all_stmt = $this->dbh->prepare($delete_all_query);
            $delete_all_stmt->bindValue(":id", $data->id, PDO::PARAM_INT);
            $delete_all_stmt->execute();
            if ($delete_all_stmt->rowCount()) {

                return $msg = [
                    "status" => 1,
                    "message" => "Dokumenti u fshi"
                ];
            } else {

                $delete_allfiles_query = "DELETE FROM  `porosit` WHERE porosit.id=:id";
                $delete_allfiles_stmt = $this->dbh->prepare($delete_allfiles_query);
                $delete_allfiles_stmt->bindValue(":id", $data->id, PDO::PARAM_INT);

                if ($delete_allfiles_stmt->execute()) {
                    return $msg = [
                        "status" => 2,
                        "message" => "Dokumenti u fshi",
                        "closepop" => 1
                    ];
                }
            }
        } else {
            return $msg = [
                "status" => 0,
                "message" => "Dokumenti nuk u fshi"
            ];
        }
    }
}
