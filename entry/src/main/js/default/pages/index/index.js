import router from '@system.router';

const ABILITY_TYPE_INTERNAL = 1;
const ACTION_INSERT_TODOLIST = 10001;
const ACTION_SELECT_TODOLIST = 10002;
const ACTION_SYNC = 0;

export default {
    data: {
        title: "",
        currentMonth: "",
        toDoLists: "",
        add_delete: "+",
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
                date:"12",
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
                date:"13",
                DATE: "2021-03-03",
            },
        ]
    },
    onShow: async function () {
        console.log("line38");
        //        this.toDoLists = [];
        //        await this.getTodos();
        //        this.number = this.todoList.length.toString() + this.$t('strings.number');
    },
    Btn_Add() {
        router.push({
            uri: "pages/newToDoPage/newToDoPage",
            params: {
                content: {
                    id: -1
                }
            }
        });
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
            //            this.toDoLists[n].index = i;
            //
            //            var _ddls = this.todoList[n].ddl.split(",");
            //            this.toDoLists[n].ddl = _ddls[0];
            //            this.toDoLists[n].ddls = [];
            //            this.toDoLists[n].ddls[0] = _ddls[1];
            //            this.toDoLists[n].ddls[1] = _ddls[2];
            //            this.toDoLists[n].ddls[2] = _ddls[3];
            //            var today = new Date();
            //            if (today.getTime() >= Date.parse(_ddls[3])){
            //                this.todoList[n].color = 3;
            //            } else if (today.getTime() >= Date.parse(_ddls[2])){
            //                this.todoList[n].color = 2;
            //            } else if (today.getTime() >= Date.parse(_ddls[1])){
            //                this.todoList[n].color = 1;
            //            } else {
            //                this.todoList[n].color = 0;
            //            }
            //            console.info("getTodos"+this.todoList[n].ddls.toString());

            n++;
        }
        console.info("end");
    }
}
