<template>
  <nav>
    <router-link to="/deptData"><button class="button"> DEPARTMENT </button></router-link>
    <router-link to="/empData"><button class="button"> EMPLOYEE </button></router-link>
  </nav>
  <router-view/>
</template>

<style>
.button {
  display: inline-block;
  border-radius: 4px;
  background-color: #0397d6;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 25px;
  padding: 8px 17px;;
  width: 200px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>
