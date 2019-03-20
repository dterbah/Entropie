<html>
    <head>
        <title>Entropie</title>
            <meta charset="UTF-8">
            <script src="http://www.iut-fbleau.fr/projet/maths/?f=pagerank.js"></script>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>                   
            <script src="./assets/js/data/array-extensions.js"></script>
            <script src="./assets/js/data/extract-data.js"></script>
            <script src="./assets/js/lib/jquery.js"></script>
            <script type="text/javascript" src="./assets/js/maths/maths.js"></script>
            <script src="./assets/js/dynamics/redirection.js"></script>     
            <script src="./assets/js/graphs/votes-graph.js"></script>                   

            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <link rel="stylesheet" href="./assets/css/index.css">
    </head>

    <body>
        <header class="w3-container header-container">
            <h2>Mathématiques: Entropie</h1>
            <div class="w3-container w3-bar subjects-container">
                <ul>
                    <li><a href="index.html">Accueil</a></li>
                </ul>
            </div>
        </header>
        <!--<header class="w3-container header-container">
            <div class="w3-container w3-bar subjects-container">
                <ul>
                </ul>
            </div>
        </header> 
-->
        <style type="text/css">
            #chart {
                overflow: auto;
            }
        </style>
        <div class="chart-div">
            <canvas id="global-chart" width="3000" height="750"></canvas>
        </div>

        <div>
            <canvas id="individual-chart" width="3000" height="750"></canvas>
        </div>  

        <center><h3 class="w3-center">Resultats des votes</h3></center>
         <div class="w3-light-grey">
            <div class="w3-container w3-blue w3-center" style="width:25%">25%</div>
        </div>

    </body>
</html>