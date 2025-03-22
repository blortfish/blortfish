<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Foundations of Mobile Design - List App</title>
    <?php
    $basePath = $_SERVER['DOCUMENT_ROOT'];
    include_once("$basePath/assets/includes/utils.php");
    echo includeFonts();
    echo includeBootstrapHeader();
    ?>

</head>
<body>
<div class='container'>
    <h1>452: Foundations of Mobile Design</h1>
    <h5>Randy Seltzer, Daniel Flint</h5>

    <h3>Mobile Map Application</h3>

    <div class="block">
        <div class="container well">

            <h4>Short Summary:</h4>

            <p>An application that is intended to provide a list of possible locations to go within the Henrietta area
                including restaurants/fast food places and grocery stores.</p>

            <h4>Audience:</h4>

            <p>The intended audience for this App is intended for college students who attend RIT. Our intention is to
                give them viable store/grocery options to choose from within Henrietta.</p>

            <h4>Goal of Use:</h4>

            <p>The goal of this application is to provide a user with information on some surrounding businesses. Our
                app will have a google maps map taking up the majority of the screen which will show the location(s) of
                the searched business.</p>

            <h4>Data Storage:</h4>

            <p>Our goal is to use local storage for the user's data so they can log on with their previous results still
                in memory.</p>

            <h4>Interface Features:</h4>
            <ul>
                <li>A Google Maps plugin</li>
                <li>A text field for the user to search for businesses</li>
                <li>Search Button</li>
                <li>A ListBox or TextArea to showw the results in text form</li>
                <li>Usability Requirement Benchmark</li>
            </ul>
            <p>The user should be able to search for a business and receive results all within a minute.</p>

            <h4>Application Architecture</h4>

            <p>Mobile/Web application Object oriented application which provides simplicity and is prepared for
                improvement/development.</p>
            <h4>Prototype:</h4>
            <a href="prototype.php">Click here</a>
        </div>
    </div>
</div>
</body>
</html>
