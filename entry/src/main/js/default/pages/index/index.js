export default {
    data: {
        title: "",
        currentMonth:"",
        toDoLists:"",
    },
    onInit() {
        this.title = this.$t('strings.world');
        this.currentMonth = "4月";
        this.toDoLists = [
            {
                title: "todo1",
                description:"des1,asdfasdfa,afsdfasdf.",
                data:"2022-4-11"
            },
            {
                title: "todo2",
                description:"des2,asdfasdfa,afsdfasdf.",
                data:"2022-4-13"
            },
        ]
    }
}
