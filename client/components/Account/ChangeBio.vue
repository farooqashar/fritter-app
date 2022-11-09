<!-- Form for changing username (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'ChangeBioForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users',
      method: 'PUT',
      hasBody: true,
      setBio: true,
      fields: [
        {id: 'bio', label: '', value: '', placeholder: 'Enter a new bio'}
      ],
      title: 'Change User Bio',
      callback: () => {
        const message = 'Successfully changed bio!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>