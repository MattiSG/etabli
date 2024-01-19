import { Command } from '@commander-js/extra-typings';

import { enhanceDomainsIntoDatabase, formatDomainsIntoDatabase, saveDomainCsvFile } from '@etabli/features/domain';
import { feedInitiativesFromDatabase, inferInitiativesFromDatabase } from '@etabli/features/initiative';
import { enhanceRepositoriesIntoDatabase, formatRepositoriesIntoDatabase, saveRepositoryListFile } from '@etabli/features/repository';

const program = new Command();

program.name('etabli').description('CLI to some deal with Établi project').version('0.0.0');

const domain = program.command('domain').description('manage domains');
const repository = program.command('repository').alias('repo').description('manage repositories');
const initiative = program.command('initiative').description('manage initiatives');
const cache = program.command('cache').description('manage cache across commands');

domain
  .command('fetch')
  .description('retrieve the csv file listing almost all public domains')
  .action(async () => {
    await saveDomainCsvFile();
  });

domain
  .command('format')
  .description('format the local csv file into the database for further analyses')
  .action(async () => {
    await formatDomainsIntoDatabase();
  });

domain
  .command('enhance')
  .description('do extra work to bring domain information that needs a third-party')
  .action(async () => {
    await enhanceDomainsIntoDatabase();
  });

domain
  .command('prepare')
  .description('execute "fetch", "format" and "enhance" sequentially')
  .action(async () => {
    await saveDomainCsvFile();
    await formatDomainsIntoDatabase();
    await enhanceDomainsIntoDatabase();
  });

repository
  .command('fetch')
  .description('retrieve all public repositories')
  .action(async () => {
    await saveRepositoryListFile();
  });

repository
  .command('format')
  .description('format repositories into the database for further analyses')
  .action(async () => {
    await formatRepositoriesIntoDatabase();
  });

repository
  .command('enhance')
  .description('do extra work to bring repository information that needs a third-party')
  .action(async () => {
    await enhanceRepositoriesIntoDatabase();
  });

repository
  .command('prepare')
  .description('execute "fetch", "format" and "enhance" sequentially')
  .action(async () => {
    await saveRepositoryListFile();
    await formatRepositoriesIntoDatabase();
    await enhanceRepositoriesIntoDatabase();
  });

initiative
  .command('infer')
  .description('create initiatives based on domains and repositories')
  .option('-d, --domain [domains...]', 'create initiative for this specific domain')
  .option('-r, --repository [repositories...]', 'create initiative for this specific repository')
  .action(async (options) => {
    await inferInitiativesFromDatabase();
  });

initiative
  .command('feed')
  .description('gather information from both domains and repositories to enhance all initiatives')
  .option('-d, --domain [domains...]', 'target this specific domain')
  .option('-r, --repository [repositories...]', 'target this specific repository')
  .option('-i, --interval', 'delay the next initiative feed')
  .option('-l, --limit', 'stop feeding after a number of initatives')
  .action(async (options) => {
    await feedInitiativesFromDatabase();
  });

initiative
  .command('search')
  .description('return initiatives that match the query')
  .argument('<query>', 'query to make the search')
  .action(async (options) => {
    console.log('initiative.search');
  });

cache
  .command('clear')
  .description('remove local files')
  .action(async () => {
    console.log('cache.clear');
  });

program.parse();
