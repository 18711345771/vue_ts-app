<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
    // @ is an alias to /src
    import {Component, Vue} from 'vue-property-decorator'
    import {Getter, Mutation, State, Action} from 'vuex-class'

    @Component({
        components: {}
    })
    export default class App extends Vue {
        @Action("setUser") setUser: any;

        created() {
            this.setUser(localStorage.tsToken)
        }
    }
</script>

<style lang="scss">
#app {
    width: 100px;
    height: 100px;
}


</style>
