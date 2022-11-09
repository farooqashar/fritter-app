<!-- Form for creating freets (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateFreetForm',
  mixins: [BlockForm],
  // eslint-disable-next-line vue/require-prop-types
  props: ["currentFreet"],
  data() {
    return {
      url: '/api/freets',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'content', label: '', value: "", placeholder: "What's Happening?"},
        {id: 'source', label: '', value: '', placeholder: 'Enter a Source For Your Freet (optional)'}
      ],
      title: "What's Happening?",
      buttonTitle: "Freet",
      refreshFreets: true,
      callback: () => {
        const message = 'Successfully created a freet!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
    
  },
};
</script>
