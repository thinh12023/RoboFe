<template>
  <div class="all" :key="db">
    <h2 class="">This is page control</h2>
    <div class="container">
      <button
        id="holdBtn"
        class="item"
        v-for="item in db"
        :key="item.id"
        @click="sendMessage(`${item.fileName}`)"
      >
        {{ item.buttonName }}
      </button>

      <button class="item" v-on:click="movePlay">To Sound Play Page</button>
      <button class="item" v-on:click="addButton">
        <el-icon class="el-icon--circle-plus" size="60"
          ><circle-plus
        /></el-icon>
      </button>
      <button class="item" v-on:click="editButton">
        <el-icon class="el-icon--edit-pen" size="60"><edit-pen /></el-icon>
      </button>
      <button class="item" v-on:click="deleteButton">
        <el-icon class="el-icon--delete" size="60"><delete /></el-icon>
      </button>
    </div>

    <el-dialog
      v-model="centerDialogVisible"
      :title="dialogName"
      width="80%"
      center
    >
      <el-form>
        <el-form-item v-if="dialogName != `Add`" label="Select Button">
          <el-select
            v-model="idEdit"
            class="m-2"
            placeholder="Select"
            @change="show"
          >
            <el-option
              v-for="item in db"
              :key="item.fileName"
              :label="item.buttonName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Button name" v-if="dialogName != `Delete`">
          <el-input v-model="buttonName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogName != `Delete`">
          <el-upload
            ref="upload"
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit="1"
            :on-change="handleUploadChange"
            :on-exceed="handleExceed"
            :auto-upload="false"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">Upload sound file in .mp3 only</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleRequest()">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import io from "socket.io-client";
import {
  UploadFilled,
  CirclePlus,
  EditPen,
  Delete,
} from "@element-plus/icons-vue";
import { nanoid } from "nanoid";

export default {
  components: {
    UploadFilled,
    CirclePlus,
    EditPen,
    Delete,
  },
  data() {
    return {
      ini: 0,
      joined: false,
      text: "",
      centerDialogVisible: false,
      buttonName: "",
      fileName: "",
      upload: {},
      selectedFile: "",
      dialogName: "",
      idEdit: "",
      idToName: "",
      db: [],
    };
  },
  methods: {
    show() {
      console.log(this.idEdit);
    },
    handleExceed(files) {
      this.$refs.upload.clearFiles();
      this.$refs.upload.handleStart(files[0]);
      console.log(files[0]);
    },
    handleUploadChange(files) {
      console.log(files);
      this.selectedFile = files.raw;
      this.fileName = files.name;
    },
    async deleteFile(id) {
      var ax = {
        method: "GET",
        redirect: "follow",
      };

      await fetch(`${process.env.VUE_APP_URL_API_TEST}/api/db/${id}`, ax)
        .then((response) => response.json())
        .then((result) => (this.idToName = result.fileName))
        .catch((error) => console.log("error", error));

      await fetch(
        `${process.env.VUE_APP_URL_API_TEST}/deleteFile/${this.idToName}`,
        ax
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
    async handleRequest() {
      if (this.dialogName == "Add") {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          id: nanoid(),
          buttonName: this.buttonName,
          fileName: this.fileName,
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        await fetch(
          `${process.env.VUE_APP_URL_API_TEST}/api/db`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
        this.upFile();
        this.buttonName = "";
      }
      if (this.dialogName == "Edit") {
        console.log(nanoid());
        var editHeaders = new Headers();
        editHeaders.append("Content-Type", "application/json");
        var rawEdit = JSON.stringify({
          buttonName: this.buttonName,
          fileName: this.fileName,
        });
        var requestOptionsEdit = {
          method: "PUT",
          headers: editHeaders,
          body: rawEdit,
          redirect: "follow",
        };
        await fetch(
          `${process.env.VUE_APP_URL_API_TEST}/api/db/${this.idEdit}`,
          requestOptionsEdit
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
        this.upFile();
        this.buttonName = "";
        this.idEdit = "";
      }
      if (this.dialogName == "Delete") {
        this.deleteFile(this.idEdit);
        var requestOptionsDelete = {
          method: "DELETE",
          redirect: "follow",
        };
        await fetch(
          `${process.env.VUE_APP_URL_API_TEST}/api/db/${this.idEdit}`,
          requestOptionsDelete
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
        this.idEdit = "";
      }
      this.getData();
    },
    async upFile() {
      var formdata = new FormData();
      formdata.append("fileRandomName", this.selectedFile);
      var requestUpload = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      await fetch(`${process.env.VUE_APP_URL_API_TEST}/upload`, requestUpload)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
    movePlay() {
      // this.$router.push({ name: "PlayPage" });
      let route = this.$router.resolve({ name: "PlayPage" });
      window.open(route.href, "_blank");
    },
    join() {
      this.joined = true;
      this.socketInstance = io(process.env.VUE_APP_URL_API);
    },
    sendMessage(text) {
      this.addMessage(text);
      this.text = "";
    },
    addMessage(text) {
      this.text = text;
      const message = this.text;
      console.log(message);
      this.socketInstance.emit("message", message);
    },
    editButton() {
      this.dialogName = "Edit";
      this.buttonName = "";
      this.centerDialogVisible = true;
    },
    addButton() {
      this.dialogName = "Add";
      this.buttonName = "";
      this.centerDialogVisible = true;
    },
    deleteButton() {
      this.dialogName = "Delete";
      this.buttonName = "";
      this.centerDialogVisible = true;
    },
    getData() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      fetch(`${process.env.VUE_APP_URL_API_TEST}/api/db`, requestOptions)
        .then((response) => response.json())
        .then((result) => (this.db = result.db))
        .catch((error) => console.log("error", error));
    },
  },
  mounted() {
    this.socketInstance = io(process.env.VUE_APP_URL_API);
    this.socketInstance.on("message:received", (data) => {
      this.messages = data;
    });
    this.getData();
  },

  name: "ChatApp",
};
</script>

<style scoped>
.all {
  text-align: center;
  margin: auto;
}
.btn {
  text-align: center;
  border-radius: 15px;
  margin-top: 1%;
  margin-bottom: 1%;
  width: 90%;
  height: 120px;
  padding: 10px;
}
.btnPlay {
  text-align: center;
  width: 45%;
  height: 20vh;
  font-size: 1.3rem;
}
.table_center {
  margin-left: auto;
  margin-right: auto;
}

.item {
  width: 30%;
  height: 20vh;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}
@media only screen and (max-width: 600px) {
  .item {
    width: 45%;
  }
}
.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

/* .container > div {
  flex: 50%; /* or - flex: 0 50% - or - flex-basis: 50% - */
/* box-shadow: 0 0 0 1px black;
  margin-bottom: 10px;
} */
</style>
