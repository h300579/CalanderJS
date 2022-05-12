import router from '@system.router';

const ABILITY_TYPE_INTERNAL = 1;
const ACTION_INSERT_TODOLIST = 10001;
const ACTION_SELECT_TODOLIST = 10002;
const ACTION_DELETE_TODOLIST = 10003;
const ACTION_SYNC = 0;

export default {
    data: {
        title: "",
        currentMonth: "",
        toDoLists: "",
        add_delete: "+",
        choose_delete:false,
        choose_indexes:[],
    },
    onInit() {
        this.title = this.$t('strings.world');
        this.currentMonth = "4月";
        this.toDoLists = [
            {
                id: "232323",
                title: "todo1",
                text: "des1,asdfasdfa,afsdfasdf.",
                year: "2022",
                month: "4",
                day: "2",
                week: "1",
                date: "12",
                DATE: "2021-03-01",
            },
            {
                id: "234234",
                title: "todo2",
                text: "des2,asdfasdfa,afsdfasdf.",
                year: "2022",
                month: "4",
                day: "3",
                week: "3",
                date: "13",
                DATE: "2021-03-03",
            },
        ]
    },
    onShow: async function () {
        console.log("line38");
        this.toDoLists = [];
        await this.getTodos();
        //        this.number = this.todoList.length.toString() + this.$t('strings.number');
    },
    Btn_Add() {
        if (this.choose_delete == false) {
            router.push({
                uri: "pages/newToDoPage/newToDoPage",
                params: {
                    content: {
                        id: -1
                    }
                }
            });
        }else{
            this.deleteTodos();
            this.choose_indexes = [];
        }
        this.choose_delete = false;
        this.add_delete = "+";
    },
    ListClicked(x) {
        //        console.info(x.toString());
        //        console.info(this.toDoLists[x].title);
        router.push({
            uri: "pages/newToDoPage/newToDoPage",
            params: {
                id: this.toDoLists[x].id,
                content: this.toDoLists[x]
            }
        });
    },
    ListLongPressed() {
        this.choose_delete = !this.choose_delete;
        console.info(this.choose_delete);
    },
    // 选择删除的TODO
    ChooseToDelete(value, e) {
        console.info("ClickToDelete" + e.checked.toString());
        if (e.checked) {
            this.add_delete = "-";
            this.choose_indexes.push(value);
            console.info("indexes: " + this.choose_indexes.toString());
        }
        else {
            this.choose_indexes.splice(this.choose_indexes.indexOf(value), 1);
            console.info("indexes: " + this.choose_indexes.toString());
        };

        if (this.choose_indexes.length == 0) {
            this.add_delete = "+";
        }
    },
    getTodos: async function (condition) {
        console.info("获取本地数据");
        var actionData = "";
        // condition 是 filter 筛选器，主要为月份筛选
        if (condition == undefined) {
            actionData = "";
        } else {
            actionData = condition.text;
        }
        console.info("try to get todos");

        var action = {};
        action.bundleName = 'com.example.calanderbs';
        action.abilityName = 'com.example.calanderbs.MainServiceAbility';
        action.messageCode = ACTION_SELECT_TODOLIST;
        action.data = actionData;
        action.abilityType = ABILITY_TYPE_INTERNAL;
        action.syncOption = ACTION_SYNC;

        var result = await FeatureAbility.callAbility(action);
        console.info("gettodos" + result);


        var jj = JSON.parse(result);
        this.toDoLists = [];
        var n = 0;
        var k;
        console.info("line 81  :" + jj);
        for (var i in jj) {
            k = jj[i].replace(/\\/, "");
            console.info("getTodoLists" + k);
            this.toDoLists[n] = JSON.parse(k);
            console.info(this.toDoLists);

            n++;
        }
        console.info("end");
    },
    deleteTodos: async function(){
        console.info("deleteTodos");
        var actionData = {};
        var action = {};
        action.bundleName = 'com.example.calanderbs';
        action.abilityName = 'com.example.calanderbs.MainServiceAbility';
        action.messageCode = ACTION_DELETE_TODOLIST;
        action.abilityType = ABILITY_TYPE_INTERNAL;
        action.syncOption = ACTION_SYNC;
        console.info("before delete");
        for (var i in this.choose_indexes) {
            console.info("loop in");

            var ii = this.choose_indexes[i];
            actionData.id = this.toDoLists[ii].id;
            action.data = actionData;
            console.info(actionData.id);
            var result = await FeatureAbility.callAbility(action);
        }
        this.getTodos();
    }
}
