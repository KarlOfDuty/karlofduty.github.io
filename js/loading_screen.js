var allFiles = 0;
var filesLeft = 0;
var loadingBar = null;
var currentFile = "";
var currentStatus = "";

loadingBar = new ProgressBar.Line("#loading-bar",
    {
        strokeWidth: 6,
        easing: 'easeOut',
        duration: 1400,
        color: '#4a8af4',
        trailColor: '#eee',
        trailWidth: 2,
        svgStyle: {width: '100%', height: '100%'},
        from: {color: '#777777'},
        to: {color: '#1194f0'},
        step: (state, loadingBar) =>
        {
            $("#percentage").text(Math.round(loadingBar.value() * 100) + '%');
        }
    });

loadingBar.animate(0.0049);

// Ran when game info is sent
function GameDetails( servername, serverurl, mapname, maxplayers, steamid, gamemode )
{
    // Hides the server that s currently being connected to from the list
    $("#" + gamemode).css("display", "none");

    // Copies it's icon and description to the current server
    $("#current-server .icon").replaceWith($("#" + gamemode + " .icon"));
    $("#current-server .description").replaceWith($("#" + gamemode + " .description"));

    // Sets the map name
    $("#current-map").text(mapname);
}

// Ran when the total number of files to be downloaded is set
function SetFilesTotal(total)
{
    allFiles = total;
}

function DownloadingFile(fileName)
{
    currentFile = fileName;
    $("#current-file").text(fileName);
}

function SetStatusChanged(status)
{
    currentStatus = status;
    $("#current-status").text(status);
    if(status === "Sending client info...")
    {
        loadingBar.animate(1);
    }
}

function SetFilesNeeded(needed)
{
    filesLeft = needed;
    loadingBar.animate((allFiles-needed)/allFiles);
}

// Developer functions, should not be active in production
//GameDetails("server name", "karlofduty.com", "ttt_stargate_b3", 20, "STEAM:0:1:543355", "murder");
//SetFilesTotal(10);
//SetFilesNeeded(5);
//DownloadingFile("player_viewmodel_ttt.mod");
//SetStatusChanged("Loading resources...");