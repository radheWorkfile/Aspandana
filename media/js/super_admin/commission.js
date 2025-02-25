$('#commission_data').submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: base_url + 'super_admin/Commission/all_commission_data',
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

$(document).ready(function() {

    let searchObj = {};

    let reportTable = {

        printTable: function(search_data) {

            $("#commissiontable").DataTable({

                "responsive": true,
                "processing": true,
                "serverSide": true,
                "order": [],
                'columnDefs': [{
                    'targets': [1, 2, 3, ],
                    'orderable': true
                }],

                "ajax": {

                    "url": base_url + 'super_admin/Commission/view_commission_data',
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

function view_commission_data(id) {

    $.ajax({
        url: base_url + 'super_admin/Commission/view_commission',
        type: "POST",
        data: {
            'id': id
        },
        success: function(data) {
            $('#show_commission').html(data);
        },
    });

}

function update_payment_data(id) {

    $.ajax({
        url: base_url + 'super_admin/Commission/update_commission',
        type: "POST",
        data: {
            'id': id
        },
        success: function(data) {

            $('#up_customer_document').html(data);
        },
    });

}

$('#commission_payment_updata').submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: base_url + 'super_admin/Commission/update_commission_payment_data',
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