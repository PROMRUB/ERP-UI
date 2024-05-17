<template>
    <div class="sidenav">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#clients">Clients</a>
        <a href="#contact">Contact</a>
    </div>
</template>

<style>
.sidenav {
    height: 100%;
    width: 240px;
    position: fixed;
    z-index: 1;
    top: 68px;
    left: 0;
    background-color: #fff;
    overflow-x: hidden;
    padding-top: 50px;
}

.sidenav a {
    padding: 14px 8px 14px 16px;
    text-decoration: none;
    font-size: 16px;
    color: #000;
    display: block;
}

.sidenav a:hover {
    color: #fff;
    background-color: #00275e;
}

.main {
    margin-left: 160px;
    /* Same as the width of the sidenav */
    font-size: 28px;
    /* Increased text to enable scrolling */
    padding: 0px 10px;
}

@media screen and (max-height: 450px) {
    .sidenav {
        padding-top: 15px;
    }

    .sidenav a {
        font-size: 18px;
    }
}
</style>