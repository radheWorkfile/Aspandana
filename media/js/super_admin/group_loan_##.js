$('#user_search').submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: base_url + 'super_admin/Group_loan/fetched_center_member_data',
        type: "POST",
        data: new FormData(this),
        processData: false,
        contentType: false,
        cache: false,
        async: false,
        success: function(data) {
            $('#user_data').html(data);
        }
    });
});

function view_chrt_fxd(value) {
    if (value == 1) {
        $('#btn_fixed').show('slow');
        $('#btn_reducing').hide('slow');
    }
}

function group_loan_product_datas(id) {

    $.ajax({
        url: base_url + 'super_admin/Group_loan/get_group_loan_product_data',
        type: "POST",
        data: {
            'id': id
        },
        dataType: 'json',
        success: function(data) {
            $('#amount').val(data.amount);
            $('#tenure').val(data.tenure);
            $('#roi').val(data.interest_percentage + data.interest_amount);
            $('#interest_type').val(data.interest_type);
            $('#processing_fee').val(data.processing_fee);
            var int_type = data.interest_type;
            if (int_type == 1) {
                $('#reducing_section').show('slow')
            } else {
                $('#reducing_section').hide('slow');
                $('#btn_reducing').hide('slow');
            }
        },
    });

}

function biweek_tenure($val) {

    if ($val == 2) {
        $('#tenure').val('20');
    }

}

// Fixed EMI Section
$("#view_chart_btn_fixed").on('click', function() {
    $('.view_chart_fixed').show('slow');

    var amt = $('#amount').val();
    var tenure = parseInt($('#tenure').val());
    var tenure_type = $('#tenure_type').val();
    var roi_amt = $('#roi').val();
    var roi_type = $('#interest_type').val();
    // var st_date = $('#loan_start_date').val()
    var st_date = config_item('work_end');
    var start_date = new Date(st_date);
    var strt_dt = start_date.getDate();
    var start_week = start_date.getDate() + 7;
    var start_month = start_date.getMonth() + 1;
    var start_year = start_date.getFullYear();
    start_date.setMonth(start_date.getMonth() + 1);
    if (tenure_type == 1) {

        var Payment_start_date = (start_date.getDate() + 7) + '/' + start_date.getMonth() + '/' + start_date.getFullYear();
    } else if (tenure_type == 2) {

        var Payment_start_date = (start_date.getDate() + 15) + '/' + start_date.getMonth() + '/' + start_date.getFullYear();
    }

    if (roi_type == 1) {

        if (tenure_type == 1 || tenure_type == 2) {

            var intrst_amt_multiple = amt * roi_amt / 100;
            var intrst_amt = intrst_amt_multiple / tenure;
            // var lastdigit           = +Math.round(intrst_amt).toString().split('').pop();  
            // var final_intrst_amts   = Math.round(intrst_amt) - lastdigit;
            // var cala                = lastdigit * (tenure - 1);
            // var rest_intrst_amt     = final_intrst_amts + cala + lastdigit;

        }

    } else if (roi_type == 2) {

        var intrst_amt = roi_amt;
        // var lastdigit         = +Math.round(intrst_amt).toString().split('').pop();  
        // var final_intrst_amts = Math.round(intrst_amt) - lastdigit;
        // var cala               = lastdigit * (tenure - 1);
        // var rest_intrst_amt   = final_intrst_amts + cala + lastdigit;

    }

    var prin_amt = amt / tenure;
    var principal_amt = amt;

    var emi_amt = parseInt(intrst_amt) + parseInt(prin_amt);
    // var lastone   = +Math.round(emi_amt).toString().split('').pop();  
    // var final_emis = Math.round(emi_amt) - lastone;
    // var cal = lastone * tenure;
    // var rest_emi  = final_emis + cal;

    let i = 0;
    let str = '';
    principal_amt = principal_amt;
    let primary = prin_amt;
    var last_principal_amt = 0;
    var lastPrimary = 0;

    let dt = start_date.setDate(start_date.getDate() + 7);
    var bi_weekly = start_date.setDate(start_date.getDate() + 15);

    for (i = 1; i <= tenure; i++) {

        if (tenure_type == 1) {

            var repeat_date = 7 * i - 7;
            var last = new Date(dt);
            last.setDate(last.getDate() + repeat_date);
        } else if (tenure_type == 2) {

            var repeat_date = 15 * i - 15;
            var last = new Date(bi_weekly);
            last.setDate(last.getDate() + repeat_date);
        }

        if (i == 1) {

            // final_emi = rest_emi;
            // final_intrst_amt = rest_intrst_amt;
            if (strt_dt == 32) {
                strt_dts = strt_dt > 31 ? strt_dt - 31 : strt_dt;
            }
            Payment_start_date = last.getDate() + '/' + last.getMonth() + '/' + last.getFullYear();

        }

        if (i > 1) {

            // final_emi = final_emis;
            // final_intrst_amt = final_intrst_amts;

            start_month++;
            principal_amt = parseFloat(principal_amt) - parseFloat(Math.abs(primary));
            if (start_month > 12) {

                start_year++;

            }

            if (tenure_type == 2) {
                start_month = start_month > 12 ? start_month - 12 : start_month;

                if (strt_dt == 32) {
                    start_month++;
                    strt_dt = strt_dt > 31 ? strt_dt - 31 : strt_dt;
                }

                strt_dt = strt_dt > 31 ? strt_dt - 30 : strt_dt;
                Payment_start_date = last.getDate() + '/' + last.getMonth() + '/' + last.getFullYear();

            }

            if (tenure_type == 1) {

                Payment_start_date = last.getDate() + '/' + last.getMonth() + '/' + last.getFullYear();
            }
        }

        if (i == tenure) {

            primary = principal_amt;
        }

        balance_amt = principal_amt - primary;
        str += `<tr><td>${i}</td><td>${Payment_start_date}</td><td >${principal_amt}</td><td>${(emi_amt)}</td><td>${intrst_amt}</td><td>${primary}</td><td>${balance_amt}</td></tr>`;

    }
    $('#emi_chart_fixed').html(str);

});

function add_group_loan(id) {

    $.ajax({

        url: base_url + 'super_admin/Group_loan/add_group_loan',
        type: "POST",
        data: {
            'id': id
        },
        success: function(data) {
            $('#show_add_group_loan').html(data);
        },

    });

}

$('#add_group_loan_data').submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: base_url + 'super_admin/Group_loan/add_group_loan_data',
        type: "POST",
        data: $(this).serialize(),
        dataType: 'json',
        success: function(data) {
            if (data.icon == "error") {
                var valid = '';
                $.each(data.text, function(i, item) {
                    valid += item;
                });
                Swal.fire({
                    position: "top-end",
                    icon: data.icon,
                    html: valid,
                    showConfirmButton: !1,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: data.icon,
                    title: data.text,
                    showConfirmButton: !1,
                    timer: 1500
                });
                setTimeout(function() {
                    window.location.reload(1);
                    window.location.href = base_url + 'super_admin/Group_loan/loan_disbursment_data';
                }, 1500);
            }
        }
    });
});

$('#disbursment_search').submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: base_url + 'super_admin/Group_loan/fetched_loan_disbursment_data',
        type: "POST",
        data: new FormData(this),
        processData: false,
        contentType: false,
        cache: false,
        async: false,
        success: function(data) {
            $('#disbursment_data').html(data);
        }
    });
});

$(document).ready(function() {
    let searchObj = {};

    let reportTable = {

        printTable: function(search_data) {

            $("#grouploantable").DataTable({

                "responsive": true,
                "processing": true,
                "serverSide": true,
                "order": [],
                'columnDefs': [{
                    'targets': [1, 2, 3, 4, 5, ],
                    'orderable': true
                }],

                "ajax": {

                    "url": base_url + 'super_admin/Group_loan/all_group_loan_data',
                    "type": "POST",
                    "dataSrc": "data",
                    "data": search_data

                },

                dom: "<'row'<'col-sm-12 col-md-4'l><'col-sm-12 col-md-4'B><'col-sm-12 col-md-4'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
                "lengthMenu": [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "All"]
                ],

                "buttons": ["excel", "pdf", "print"]

            });

        }

    }

    reportTable.printTable(searchObj);
});

function view_group_loan_details(id) {

    $.ajax({

        url: base_url + 'super_admin/Group_loan/view_group_loan_details',
        type: "POST",
        data: {
            'id': id
        },
        success: function(data) {
            $('#show_group_loan').html(data);
        },

    });

}

function update_group_loan_details(id) {

    $.ajax({
        url: base_url + 'super_admin/Group_loan/update_group_loan_details',
        type: "POST",
        data: {
            'id': id
        },
        success: function(data) {

            $('#up_group_loan').html(data);
        },
    });

}

$('#group_loan_updata').submit(function(e) {

    e.preventDefault();
    $.ajax({
        url: base_url + 'super_admin/Group_loan/update_group_loan_data',
        type: "POST",
        data: new FormData(this),
        processData: false,
        contentType: false,
        cache: false,
        async: false,
        dataType: 'json',
        success: function(data) {
            if (data.icon == "error") {
                var valid = '';
                $.each(data.text, function(i, item) {
                    valid += item;
                });
                Swal.fire({
                    position: "top-end",
                    icon: data.icon,
                    html: valid,
                    showConfirmButton: !1,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: data.icon,
                    title: data.text,
                    showConfirmButton: !1,
                    timer: 1500
                });
                setTimeout(function() {
                    window.location.reload(1);
                }, 1500);
            }
        }
    });

});

function update_disbursment_details(id) {

    $.ajax({
        url: base_url + 'super_admin/Group_loan/update_disbursment_status_details',
        type: "POST",
        data: {
            'id': id
        },
        success: function(data) {

            $('#up_disbursment').html(data);
        },
    });

}

$('#disbursment_updata').submit(function(e) {

    e.preventDefault();
    $.ajax({
        url: base_url + 'super_admin/Group_loan/update_disbusrsment_status_data',
        type: "POST",
        data: new FormData(this),
        processData: false,
        contentType: false,
        cache: false,
        async: false,
        dataType: 'json',
        success: function(data) {
            if (data.icon == "error") {
                var valid = '';
                $.each(data.text, function(i, item) {
                    valid += item;
                });
                Swal.fire({
                    position: "top-end",
                    icon: data.icon,
                    html: valid,
                    showConfirmButton: !1,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: data.icon,
                    title: data.text,
                    showConfirmButton: !1,
                    timer: 1500
                });
                setTimeout(function() {
                    window.location.reload(1);
                }, 1500);
            }
        }
    });

});