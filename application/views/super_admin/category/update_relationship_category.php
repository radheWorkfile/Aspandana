<div class="row">
    <div class="col-lg-12">
        <div class="mb-3">
            <label class="form-label">Category Name</label>
            <input class="form-control" type="hidden" name="id" id="id" value="<?php echo $category['id'] ?>">
            <input class="form-control" type="text" name="category_name" id="category_name" value="<?php echo $category['category_name'] ?>"oninput="this.value = this.value.toLowerCase().replace(/[^a-z ]/g, '').replace(/\s+/g, ' ');">
        </div>
    </div>
    <div class="col-lg-12">
        <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea name="description" id="description" rows="2" class="form-control"oninput="this.value = this.value.toLowerCase().replace(/[^a-z0-9,. ]/g, '').replace(/\s+/g, ' ');"><?php echo $category['description'] ?></textarea>
        </div>
    </div>
</div>