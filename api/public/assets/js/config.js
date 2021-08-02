var bar = false;
document.getElementById("openNavElement").onclick = () => {
    toggleNav()
}

function toggleNav() {
    if(bar)
        document.getElementById("sidenav").style.left = "-350px";
    else
        document.getElementById("sidenav").style.left = "0px";
    bar = !bar;
}