

<?php $__env->startSection('content'); ?>

<h1>Ajouter une catégorie</h1>
<form method="POST" action="<?php echo e(route('storecategorie')); ?>" class="form-select">
    <?php echo csrf_field(); ?>
    <div class="form-group">
        <label for="">Catégorie</label>
        <input type="text" class="form-control" name="categorie" id="categorie">
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-primary">Ajouter</button>
    </div>
</form>
<?php echo $__env->make('base', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\wamp64\www\CultureQuizz\back\resources\views/createcategorie.blade.php ENDPATH**/ ?>