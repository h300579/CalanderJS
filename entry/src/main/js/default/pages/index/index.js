import router from '@system.router';


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
                title: "todo1",
                description: "des1,asdfasdfa,afsdfasdf.",
                year: "2022",
                month: "4",
                day: "11",
                week: "1",
            },
            {
                title: "todo2",
                description: "des2,asdfasdfa,afsdfasdf.",
                year: "2022",
                month: "4",
                day: "13",
                week: "3",
            },
        ]
    },
    Btn_Add(){
        router.push({
            uri:"pages/newToDoPage/newToDoPage",
            params: {
                content: {id: -1}
            }
        });
    }
}
