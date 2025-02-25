$('#add_loan_product_data').submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: base_url + 'super_admin/category/Loan_product/add_loan_product_data',
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
                }, 1500);
            }
        }
    });
});

function view_loan_product(id) {
    $.ajax({
        url: base_url + 'super_admin/category/Loan_product/view_loan_product_data',
        type: "POST",
        data: {
            'id': id
        },
        success: function(data) {
            $('#show_loan_prod').html(data);
        },
    });
}

function update_loan_product(id) {
    $.ajax({
        url: base_url + 'super_admin/category/Loan_product/update_loan_product',
        type: "POST",
        data: {
            'id': id
        },
        success: function(data) {

            $('#up_loan_prod').html(data);
        },
    });
}

$('#loan_product_updata').submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: base_url + 'super_admin/category/Loan_product/update_loan_product_data',
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

// ===================================== create Income Sources js part start ======================================

$('#create_income_sources').submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: base_url + 'super_admin/category/Income_source/add_income_sourse',
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
            $("#income_sources").DataTable({
                "responsive": true,
                "processing": true,
                "serverSide": true,
                "order": [],
                'columnDefs': [{
                    'targets': [1, 2, 3, ],
                    'orderable': true
                }],
                "ajax": {
                    "url": base_url + 'super_admin/category/Income_source/list_income_sourse',
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

function view_Income_Sources(id) {
    $.ajax({
        url: base_url + 'super_admin/category/Income_source/view_Income_Sources',
        type: "POST",
        data: {
            'id': id
        },
        success: function(data) {
            $('#show_Income_Sources').html(data);
        },
    });
}


function update_Income_Sources(id) {
    $.ajax({
        url: base_url + 'super_admin/category/Income_source/update_Income_Sources',
        type: "POST",
        data: {
            'id': id
        },
        success: function(data) {
            $('#update_Income_Sources').html(data);
        },
    });
}

$('#income_sources_updata').submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: base_url + 'super_admin/category/Income_source/update_Income_Sources_data',
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


// ===================================== create Income Sources js part end ======================================


$(document).ready(function() {
    let searchObj = {};
    // Reporting Section
    let reportTable = {

        printTable: function(search_data) {

            $("#leadtable").DataTable({

                "responsive": true,
                "processing": true,
                "serverSide": true,
                "order": [],
                'columnDefs': [{
                    'targets': [1, 2, 3, ],
                    'orderable': true
                }],

                "ajax": {

                    "url": base_url + 'super_admin/category/Loan_product/loan_product_data',
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

$('#interest_type').on('change', function() {

    let int_type = this.value;

    if (int_type == 1) {

        $('#percentage_section').show('slow');
        $('#amount_section').hide('slow');

    } else if (int_type == 2) {

        $('#amount_section').show('slow');
        $('#percentage_section').hide('slow');

    }

});