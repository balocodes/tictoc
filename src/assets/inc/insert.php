    <?php
    /* Attempt MySQL server connection. Assuming you are running MySQL
    server with default setting (user 'root' with no password) */
    $link = mysqli_connect("localhost", "root", "", "wordasap");

     

    // Check connection
    if($link === false){
        die("ERROR: Could not connect. " . mysqli_connect_error());
    }
   

    // Escape user inputs for security
    $title = mysqli_real_escape_string($link, $_POST['title']);
    $duration = mysqli_real_escape_string($link, $_POST['duration']);
	$price = mysqli_real_escape_string($link, $_POST['price']);
    $status = mysqli_real_escape_string($link, $_POST['status']);
     

    // attempt insert query execution
    $sql = "INSERT INTO package (title, duration, price, status  ) VALUES ('$title', '$duration', '$price', '$status')";

    if(mysqli_query($link, $sql)){
        echo "Records added successfully.";

    } else{

        echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);

    }     

    // close connection
    mysqli_close($link);

    ?>