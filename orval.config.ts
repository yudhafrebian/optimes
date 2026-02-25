module.exports = {
  service1: {
    input: 'http://192.168.68.99:2000/docs-json',
    output: {
      target: './src/api/generated/common-service.ts',
      client: 'axios', 
      override: {
        mutator: {
          path: './src/api/mutator.ts',
          name: 'customInstance1',
        },
      },
    },
  },
  
  // service2: {
  //   input: './schemas/api-baru.json',
  //   output: {
  //     target: './src/api/generated/event-service.ts',
  //     client: 'axios', // Pakai axios murni
  //     override: {
  //       mutator: {
  //         path: './src/api/mutator.ts',
  //         name: 'customInstance2',
  //       },
  //     },
  //   },
  // },
};