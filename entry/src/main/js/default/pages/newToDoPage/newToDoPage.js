import router from '@system.router';

const ABILITY_TYPE_INTERNAL = 1;
const ACTION_INSERT_TODOLIST = 10001;
const ACTION_SELECT_TODOLIST = 10002;
const ACTION_SYNC = 0;

export default {
    data: {
        ID: "",
        title: "",
        text: "",
        year: "",
        month: "",
        date: "",
        day: "",
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
        weekArray: ["日", "一", "二", "三", "四", "五", "六"]
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
        this.year = currentDate.getFullYear();
        this.month = currentDate.getMonth() + 1;
        this.date = currentDate.getDate();
        this.day = this.weekArray[currentDate.getDay()];
    },
    onShow() {
        this.id = this.content.id;
        this.title = this.content.title;
        this.text = this.content.text;
        this.ddl = this.content.DATE;
    },
    ChangeData(e) {

        this.ddl = e.year + "/" + (e.month + 1) + "/" + e.day;
        this.year = e.year;
        this.month = e.month + 1;
        var date = e.year + "-" + (e.month + 1) + "-" + e.day;
        console.log(date);
        this.day = this.weekArray[new Date(date).getDay()];
        ;
        this.date = e.day;


        console.info(this.year);
        console.info(this.month);
        console.info(this.date);
        console.info(this.day);
    },
    ChangeTitle(e) {
        this.title = e.text;
    },
    ChangeText(e) {
        this.text = e.text;
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
        todoList.DATE = this.id;
        todoList.year = this.year;
        todoList.month = this.month;
        todoList.date = this.date;
        todoList.day = this.day;
        //        if (this.ddl_exist)
        //        {actionData.ddl = this.ddl_to_pass;}
        //
        var action = {};
        action.bundleName = 'com.example.calanderbs';
        action.abilityName = 'com.example.calanderbs.MainServiceAbility';
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
