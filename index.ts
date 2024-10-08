#!/usr/bin/env bun
import { Command } from 'commander'
import * as core from './core/index'

const program = new Command()

program
    .name('merkato')
    .version('0.1.0')
    .description('commerce infrastructure')
  
program
    .command('new')
    .description('create a new shop in current folder')
    .action(async () => {
        await core.init()
    })

program
    .command('status')
    .description('check current configuration')
    .action(async () => {
        await core.status()
    })

program
    .command('check')
    .description('sanity check for current system')
    .action(async () => {
        await core.check()
    })

program
    .command('get')
    .description('fetch a remote config')
    .action(async () => {
        console.log('get')
    })

program.parse()