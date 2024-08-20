import chalk from 'chalk'
import { $ } from 'bun'
import os from 'node:os'
import { createSpinner } from 'nanospinner'
import { load } from 'js-toml'
import pkg from '../../package.json'

export async function check() {
    console.log('merkato v'+ pkg.version)
    console.log(os.platform() +' - '+ os.arch())

    const incus_spinner = createSpinner('is sqlite3 installed?').start();
    const { exitCode: incus_exitCode } = await $`sqlite3 --version`.nothrow().quiet()

    if (incus_exitCode === 0) {
        incus_spinner.success()
    } else {
        incus_spinner.error()
    }

    const gf_spinner = createSpinner('does .merkato folder exist?').start();
    const { exitCode: gf_exitCode } = await $`du -h --max-depth=1 ./.merkato`.nothrow().quiet()

    if (gf_exitCode === 0) {
        gf_spinner.success()
    } else {
        gf_spinner.error()
    }

    const gc_spinner = createSpinner('does shop.toml file exist?').start();
    const { exitCode: gc_exitCode } = await $`du -sh ./.merkato/shop.toml`.nothrow().quiet()

    if (gc_exitCode === 0) {
        gc_spinner.success()
    } else {
        gc_spinner.error()
    }

    const gt_spinner = createSpinner('is shop.toml file valid?').start();
    try {
        const path = './.merkato/shop.toml'
        const file = Bun.file(path)
        const gtoml = await file.text();
        const data = load(gtoml)
        gt_spinner.success()
        //console.log(gtoml)
    } catch(e) {
        gt_spinner.error()
        //console.log(e)
    }

    process.exit(0)
}