<div class="row">
    <div class="col-sm-2 col-xs-12 settings-header">Marks:</div>
    <div class="col-sm-10 col-xs-12">
        <p class="lead">
            Define and customise your markdown codes
        </p>
        <p>
            use "\" in your regex. it is put in as <code>new RegExp(regex)</code>
        </p>
            <p>
        <div id="marks">
            <!-- BEGIN marks -->
            <div class="well">
                <form>
                    <span class="pull-right"><i class="fa fa-times pointer"></i></span>

                    <label>Name
                    <input type="text" class="form-control" name="name" value="{marks.name}" />
                    </label>

                    <label>regex
                    <input type="text" class="form-control" name="route" value="{marks.regex}" />
                    </label>
                    <label>Replacement
                    <input type="text" class="form-control" name="replacement" value="{marks.replacement}" />
                    </label>
                </form>
            </div>
            <!-- END marks -->
        </div>
    </div>
</div>

<div class="template well hidden">
    <form>
        <span class="pull-right"><i class="fa fa-times pointer"></i></span>

        <label>Name
        <input type="text" class="form-control" name="name" value="" />
        </label>

        <label>regex
        <input type="text" class="form-control" name="regex" value="" />
        </label>
        <label>Replacement
        <input type="text" class="form-control" name="replacement" value="" />
        </label>
    </form>
</div>

<button class="btn btn-lg btn-success pull-right" id="add"><i class="fa fa-plus"></i> Add New Mark</button>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
    <i class="material-icons">save</i>
</button>

<script>
    function addCloseHandler() {
        $('#marks .fa-times').on('click', function() {
            $(this).parents('.well').remove();
        });
    }
    $('#add').on('click', function(ev) {
        var clone = $('.template').clone().removeClass('template hidden');
        $('#marks').append(clone);
        addCloseHandler();
    });
    addCloseHandler();
    $('#save').on('click', function(ev) {
        var arr = [];
        $('#marks .well form').each(function() {
            var data = $(this).serializeArray();
            if (data[1].value && !data[1].value.match(' ') && data[1].value !== '') {
                arr.push({
                    name: data[0].value,
                    regex: encodeURIComponent(data[1].value),
                    replacement: encodeURIComponent(data[2].value)
                });
            }

        });
        socket.emit('admin.settings.saveMarks', arr, function() {
            app.alertSuccess('Custom marks saved and activated');
        });
    });
</script>
