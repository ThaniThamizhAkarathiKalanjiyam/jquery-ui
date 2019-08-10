$(function () {
    var _startDate='';
    var _endDate = '';
    var _language='EN';

    /* 得到日期年月日等加数字后的日期 */
    Date.prototype.dateAdd = function (interval, number) {
        var d = this;
        var k = { 'y': 'FullYear', 'q': 'Month', 'm': 'Month', 'w': 'Date', 'd': 'Date', 'h': 'Hours', 'n': 'Minutes', 's': 'Seconds', 'ms': 'MilliSeconds' };
        var n = { 'q': 3, 'w': 7 };
        eval('d.set' + k[interval] + '(d.get' + k[interval] + '()+' + ((n[interval] || 1) * number) + ')');
        return d;
    },
    loadDayOptions = function () {
        var year = $("#year").val();
        var month = $("#month").val();
        _startDate = year + '-' + month + '-01';
        var date1 = new Date(Date.parse(_startDate.replace(/-/g, "/")));
        var mydate = new Date(Date.parse(_startDate.replace(/-/g, "/")));
        var date2 = mydate.dateAdd('m', 1).dateAdd('d', -1);
        var m2 = date2.getMonth() + 1;
        var m2str = '' + m2;
        if (m2 < 10)
            m2str = '0' + m2;

        _endDate = date2.getFullYear() + '-' + m2str + '-' + date2.getDate();
        //alert(_endDate);

        var optionStr = '';
        for (var i = 1; i <= date2.getDate() ; i++) {
            optionStr += '<option value="' + addPrefix(i) + '">' + addPrefix(i) + '</option>';
        }
        $("#day").html(optionStr);
    },
    addPrefix = function (i) {
        return (i < 10) ? '0' + i : i;
    },
    initCurrentYearMonth = function () {
        var cur = new Date();
        $("#year").val(cur.getFullYear());
        $("#month").val(addPrefix(cur.getMonth() + 1));
        loadDayOptions();
    },
    generate = function () {
        var y = $("#year2").val();
        //alert(y);
        $.get("/inc/wnl/handler.ashx", { cmd: "generate", year: y }, function (data) {
            $("#divContent").html(data);
        });
    };
    //搜单日
    searchSingleDay = function () {
        
        var d = $("#year").val() + '-' + $("#month").val() + '-' + $("#day").val();
        //alert(d);
        $.get("/inc/wnl/handler.ashx", { cmd: "single", date: d, language: _language }, function (data) {

            $("#divContent").html(data);
            $("#divContent .sid").after(getLunarCalander($("#year").val(), $("#month").val(), $("#day").val()));

        });
    },
    //农历日期
    getLunarCalander = function (y, m, d) {
        var curDate = new Date(y, parseInt(m - 1), d);
        var lc = new LC.lunar(curDate);
        var lunarName = 'Chinese Lunar Date：';
        if (_language == "CN")
            lunarName = '农历：';
        return '<br/><span class="red">' + LC.monthName[lc.month - 1] + ' ' + lc.day + ', ' + LC.get_ganzhi(lc.year) + ' Year (' + lc.year + ')</span>';
    },
    //干支历
    getSolarCalander = function (y, m, d) {

        var curDate = new Date(y, parseInt(m - 1), d);
        var lc = new LC.lunar(curDate);
        var lunarName = 'Chinese Solar Date：';
        if (_language == "CN")
            lunarName = '干支历：';
        return '<br/><span class="red">' + LC.get_ganzhiDay(curDate) + ' Day, ' + LC.get_ganzhiMonth(lc.year, lc.month - 1) + ' Month, ' + LC.get_ganzhi(lc.year) + ' Year (the Year of the ' + LC.get_animal(lc.year) + ')</span>';
    },
    getEnglishCalander = function (y,m,d) {
        var curDate = new Date(y, parseInt(m - 1), d);
        var lc = new LC.lunar(curDate);

    },
    //搜多日
    searchMultipleDay = function () {
        
        var pe = $("#period").val();
        var as = $("#aspect").val();
        var it = $("#item").val();
        alert(pe+'---'+as+'---'+it);
        $.get("/inc/wnl/handler.ashx", { cmd: "multiple", period: pe, aspect: as, item: it, language: _language }, function (data) {
            //alert(data);
            $("#divContent").html(data);

            $("#divContent span[class='date']").each(function (i) {
                var v = $(this).attr('value');
                var ary = v.split("-");
                $(this).after(getSolarCalander(ary[0], ary[1], ary[2]));
                $(this).after(getLunarCalander(ary[0], ary[1], ary[2]));
            });

            highLightKeyword(as, $("#item option:selected").text());
        });
    },
    //高亮关键字
    highLightKeyword = function (aspect, keyword) {
        $("#divContent span[class='" + aspect + "']").each(function (i) {
            var content = $(this).html();
            //alert(content);
            //alert(keyword);
            if (content.indexOf(keyword) > 0) {
                content = content.replace(keyword, '<span class="highlight_keyword">' + keyword + '</span>');
            }
            $(this).html(content);

        });
        
    },
    initCboPeriodAndAspect = function () {
        var periodCn = [ '一周内', '一月内', '半年内'];
        var periodEn = [ '1 week', '1 month', '6 months'];
        var aspectCn = { 'y': '宜', 'j': '忌' };
        var aspectEn = { 'y': 'Dos', 'j': 'Don\'ts' };
        var aryPeriod = periodEn;
        var aryAspect = aspectEn;
        if (_language == "CN") {
            aryPeriod = periodCn;
            aryAspect = aspectCn;
            $("#btnSearch").val('查询');
            $("#btnSearch2").val('查询');
        }
        var ss='';
        var dd = '';
        $.each(aryPeriod, function (i, val) {
            ss += '<option value="'+(i+1)+'">'+val+'</option>';
        });
        $("#period").html(ss);

        $.each(aryAspect, function (key, val) {
            dd += '<option value="' + key + '">' + val + '</option>';
        });
        $("#aspect").html(dd);


    },
    initCboItem = function () {
        $.get("/inc/wnl/handler.ashx", { cmd: "initCbo", language: _language }, function (data) {
            $("#item").html(data);
        });
    },
    initCboPeriod = function () {
        $.get("/inc/wnl/handler.ashx", { cmd: "initCboPer" }, function (data) {
            $("#period").html(data);
        });
    },

    initData = function () {
        initCurrentYearMonth();
        //initCboPeriodAndAspect();
        initCboItem();
        initCboPeriod();

    }


    initData();
    $("#year").change(loadDayOptions);
    $("#month").change(loadDayOptions);
    $("#btnSearch").click(searchSingleDay);
    $("#btnSearch23").click(searchMultipleDay);
    $("#btnGene").click(generate);
});