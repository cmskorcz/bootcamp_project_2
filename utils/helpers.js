module.exports = {
    format_date: data => {
        return `${new Date(data).getMonth()+1}/${new Date(data).getDate()}/${new Date(data).getFullYear()}`
    }
}