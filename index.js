getListWithDateRangeByUser = async (id, startDate, endDate) => {
        const { listData } = (await getGraphResult(getListByUserQuery(id, startDate, endDate))).data;
        const sum = {};
        const count = {};

        listData.map(a => {
            sum[a.propertyName] = !sum[a.propertyName] ? 0 + a.anyNumberTypeProperty : sum[a.propertyName] + a.anyNumberTypeProperty;
            count[a.propertyName] = !count[a.propertyName] ? 1 : count[a.propertyName] + 1;
        })


        return {
            listData,
            sum: Object.entries(sum).map(([name, value]) => ({ name, value })),
            count: Object.entries(count).map(([name, value]) => ({ name, value })),
        };
    }

// Graphql query
// initialize start, end and default dates
var current_date = new Date();
var next_day = new Date().setDate(new Date().getDate() + 1);

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

// init query
// if start and end exists return with start and end date else return with today date
export const getListByUserQuery = (id, start_date, end_date) => `
{
    listData(where: { 
        user: "${id}" ,
        startTime_gt:"${start_date || formatDate(current_date)}",
        startTime_lt:"${end_date || formatDate(next_day)}"
    }) {
        propertyName
        startTime
        endTime
        anyNumberTypeProperty
    }
}
`;
