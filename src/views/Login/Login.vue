<template>
  <div class="fullScreen">
    <div id="login" class="container">
      <h1>Login</h1>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Account">
          <el-input v-model="account"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="password" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button round type="primary" @click="submitForm()"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      account: "",
      password: "",
      jsonResult: {},
    };
  },
  methods: {
    // checkStatus() {
    //   if (this.jsonResult.status == 1) {
    //     console.log("this is " + this.jsonResult.data.accessToken);
    //     localStorage.setItem("jwt", this.jsonResult.data.accessToken);
    //     this.$router.push({ path: "/home" });
    //   }
    // },
    // async submitForm() {
    //   if (this.account == "" || this.password == "") {
    //     console.log("pls enter all info");
    //   } else {
    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     var raw = JSON.stringify({
    //       email: this.account,
    //       password: this.password,
    //     });

    //     var requestOptions = {
    //       method: "POST",
    //       headers: myHeaders,
    //       body: raw,
    //       redirect: "follow",
    //     };

    //     await fetch(`${process.env.VUE_APP_BACKEND}/user/login`, requestOptions)
    //       .then((response) => response.json())
    //       .then((result) => (this.jsonResult = result))
    //       .then((result) => console.log(result))
    //       .catch((error) => console.log("error", error));
    //     await this.checkStatus();
    //     // await console.log("this is" + result);
    //   }
    // },
    submitForm() {
      this.$router.push("/home");
    },
    enterHandler(e) {
      if (e.keyCode === 13) {
        this.submitForm();
      }
    },
  },
  created: function () {
    window.addEventListener("keyup", this.enterHandler);
  },
  unmounted: function () {
    window.removeEventListener("keyup", this.enterHandler);
  },
};
</script>

<style scoped>
.fullScreen {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-image: url("../../assets/bg3.jpg");
  background-size: cover;
}
.container {
  /* width: 400px;
  align-items: center;
  margin: auto;
  padding-right: 5%;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 30%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  background-image: url("../../assets/bg2.jpg"); */
  background-color: aliceblue;
  padding-right: 3rem;
}

.bg {
  /* background-image: url("../../assets/bg2.jpg");
  height: 100%;
  width: 100%; */
}
</style>
