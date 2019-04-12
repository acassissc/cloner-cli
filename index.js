#!/usr/bin/env node

const services = require('./services.json')
const program = require('commander')
const shell = require('shelljs')
const clone = require('git-clone')

// const { prompt } = require('inquirer')

// const questions = [
//   {
//     type : 'input',
//     name : 'firstname',
//     message : 'Enter firstname ..'
//   }
// ];

program.version('0.0.1').description('cli clone teste')

program
  .command('clone <microService>')
  .alias('cl')
  .description('clone a repository into your project as it was your code')
  .action(microService => {
    if (services[microService]) {
      const name = services[microService].name
      clone(services[microService].repository, `services/${name}`, () => {
        const git = `./services/${name}/.git`
        shell.rm('-rf', git)
        shell.cd(`services/${name}`)
        shell.exec('npm install')
        shell.cd('../..')
      })
    } else {
      console.error("ERROR   didn't find the repository. Check the name.")
    }
  })

program.parse(process.argv)
