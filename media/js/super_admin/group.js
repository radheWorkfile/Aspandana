$(document).ready(function() {
    let searchObj = {};

    let reportTable = {

        printTable: function(search_data) {

            $("#leadtable").DataTable({

                "responsive": true,
                "processing": true,
                "serverSide": true,
                "order": [],
                'columnDefs': [{
                    'targets': [1, 2, 3, 4],
                    'orderable': true
                }],

                "ajax": {

                    "url": base_url + 'super_admin/Group/group_data',
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

$('#add_group_data').submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: base_url + 'super_admin/Group/add_group_data',
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
                    window.location.href = base_url + 'super_admin/Group/manage_group';
                }, 1500);
            }
        }
    });
});

function view_group(id) {

    $.ajax({
        url: base_url + 'super_admin/Group/view_group',
        type: "POST",
        data: {
            'id': id
        },
        success: function(data) {
            $('#show_group').html(data);
        },
    });

}

function update_group(id) {
    $.ajax({
        url: base_url + 'super_admin/Group/update_group',
        type: "POST",
        data: {
            'id': id
        },
        success: function(data) {

            $('#up_group').html(data);
        },
    });
}

$('#group_updata').submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: base_url + 'super_admin/Group/update_group_data',
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

function view_group_member(id) {

    $.ajax({
        url: base_url + 'super_admin/Group/view_group_member',
        type: "POST",
        data: {
            'id': id
        },
        success: function(data) {
            $('#show_group_member').html(data);
        },
    });

}

$(document).ready(function() {
    let searchObj = {};
    let ids = $('#ids').val();
    let reportTable = {

        printTable: function(search_data) {

            $("#grouptable").DataTable({

                "responsive": true,
                "processing": true,
                "serverSide": true,
                "order": [],
                'columnDefs': [{
                    'targets': [1, 2, 3, 4],
                    'orderable': true
                }],

                "ajax": {

                    "url": base_url + 'super_admin/Group/group_member_data',
                    "type": "POST",
                    "dataSrc": "data",
                    "data": {
                        'search_data': search_data,
                        'id': ids
                    }

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

function member_payment_details(id) {

    $.ajax({

        url: base_url + 'super_admin/Group/member_payment_detls',
        type: "POST",
        data: {
            'id': id
        },
        success: function(data) {
            $('#show_member_payment').html(data);
        },

    });

}