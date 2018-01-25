<template>
	<aside>
	    <div id="sidebar"  class="nav-collapse sblue-bg">
	   		<ul class="sidebar-menu">
		        <li class="user-box">
		            <img src="../../../static/img/usericon.svg" class="fl" alt="" style="width:45px;"/>
		            <div class="fl">
		                <p class="welcome">Welcome</p>
		                <p>{{ userInfoData.userName }}<i class=" icon-arrow-right2"></i></p>
		            </div>
		        </li>
	        </ul>
	 		<el-menu  default-active="item.url" class="sidebar-menu"  v-for="(item, index ) in barlist" :key="index"  @open="handleOpen"  @select="handleSelect" ref="menuSelect">
		       <el-submenu :default-active="item.url" v-if="item.children&&item.children.length>0" :index="index">
             <template slot="title"><i :class="item.icon"></i><span style="titlespan">{{ item.name }}</span></template>
		         	<el-menu-item-group  class="childli2"  v-for="(child,i) in item.children" :key="i">
			           <router-link :to="'/'+item.url+'/'+child.url">
                   <el-menu-item :index="index+20" class="childli secend_layer"><span style="titlespan">{{ child.name }}</span></el-menu-item>
			           </router-link>
		         	</el-menu-item-group>
		       </el-submenu>
		       <router-link v-else :to="'/'+item.url">
             <el-menu-item :index="index" class="childli"><i :class="item.icon"></i><span style="titlespan">{{ item.name }}</span></el-menu-item>
		       </router-link>
	     	</el-menu>
	    </div>
	</aside>
</template>

<script>
import {mapState} from 'vuex'
import {getStore} from '../../config/mUtils'
  export default {
    name: 'sidebarItem',
    data() {
      return {
        itemList: null,
        userInfo:getStore('userInfo'),
      }
    },
    props: {
      barlist: {
        type: Array
      }
    },
    mounted(){
      this.init()
    },
    computed: {
      ...mapState([
        'adminName'
        ]),
      userInfoData(){

        return eval('(' + this.userInfo + ')');
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        this.closeTab(key);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleSelect(index) {
        if(index>20){
          return true;
        }else{
          this.closeTab();
        }
      },
      closeTab(index){
        if(index==''||index==null){

            for (var i = 0; i < 10; i++) {
              this.$refs.menuSelect[i].closeMenu(i);
            }
        }else{

          for (var i = 0; i < 10; i++) {
            if(i!=index){
              this.$refs.menuSelect[i].closeMenu(i);
            }
            
          }
        }

      },
      init(){
          $("html").niceScroll({
            cursorcolor: "#fff",
            cursoropacitymax: 0.5, 
            hwacceleration: true
          });
          $("#sidebar").niceScroll({
            cursorcolor: "#fff",
            cursoropacitymax: 0.5,  
            hwacceleration: true
          });
          $("#app").getNiceScroll().hide();
          $("#app").getNiceScroll().resize();
      }
    }
  }
</script>
<style scoped>
	@import '../../../static/assets/font-awesome/css/font-awesome.css';
	#sidebar{overflow-x: auto !important;}
</style>
