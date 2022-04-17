import router from '@system.router';

const ABILITY_TYPE_INTERNAL = 1;
const ACTION_INSERT_TODOLIST = 10001;
const ACTION_SYNC = 101;

export default {
    data: {
        ID: "",
        title: "",
        text: "",
        BACK: "",
        SAVE: "",
        CANCEL: "",
        CONFIRM: "",


        index: "",
        datatext: "",
        ddl_to_pass: "",
        ddl: "",
        ddl_exist: false,
        content: {},
    },
    onInit() {

        this.datatext = this.$t('strings.data');
        this.BACK = this.$t('strings.back');
        this.CANCEL = this.$t('strings.cancel');
        this.CONFIRM = this.$t('strings.confirm');
        this.SAVE = this.$t('strings.save');
        this.title = this.$t('strings.title');
        this.text = this.$t('strings.text');

        var currentDate = new Date();
        this.ddl = currentDate.getFullYear() + "/" + (currentDate.getMonth() + 1).toString() + "/" + currentDate.getDate();

        this.id = this.content.id;
    },
    ChangeData(e) {
        this.ddl = e.year + "/" + (e.month + 1) + "/" + e.day;
    },
    ChangeTitle(e) {
        this.title = e.text;
    },
    ChangeText(e) {
        this.title = e.text;
    },
    ClickToBack() {
        router.back();
    },
    generateId() {
        var currentDate = new Date();
        var result = currentDate.getFullYear().toString() + currentDate.getMonth() + currentDate.getDate() + currentDate.getHours() + currentDate.getMinutes() + currentDate.getSeconds();
        console.log(result);
        return result;
    },
    InsertTodos: async function () {

        if (this.id == -1) {

            this.id = this.generateId();
        }
        console.info("ClickToSave()" + this.id);

        var todoList = {};


        todoList.id = this.id.toString();
        todoList.title = this.title;
        todoList.text = this.text;
        todoList.date = this.GetToday();
        //        if (this.ddl_exist)
        //        {actionData.ddl = this.ddl_to_pass;}
        //
        var action = {};
        action.bundleName = 'com.example.backup';
        action.abilityName = 'com.example.backup.MainServiceAbility';
        action.messageCode = ACTION_INSERT_TODOLIST;
        action.data = todoList;
        action.abilityType = ABILITY_TYPE_INTERNAL;
        action.syncOption = ACTION_SYNC;
        //
        var result = await FeatureAbility.callAbility(action);
        console.info("insert ret=" + result);
        router.back();
    },
}
