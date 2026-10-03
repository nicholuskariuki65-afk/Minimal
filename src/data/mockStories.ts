import { Story, Topic } from '../types';

import techImage from '../assets/images/article_tech_ai_workspace_1791037930225.jpg';
import kenyaImage from '../assets/images/article_kenya_digital_economy_1791037942687.jpg';
import startupImage from '../assets/images/article_startups_founders_1791037954667.jpg';
import environmentImage from '../assets/images/article_environment_landscape_1791037965783.jpg';

export const ALL_TOPICS: Topic[] = [
  'Kenya',
  'Technology',
  'Startups',
  'Business',
  'Finance',
  'Science',
  'World',
  'Sports',
  'Gaming',
  'Health',
  'Culture',
  'Environment',
];

export const MOCK_STORIES: Story[] = [
  {
    id: 'story-tech-compact-ai',
    title: 'Why smaller AI models are becoming more useful for everyday businesses',
    slug: 'smaller-ai-models-practical-business',
    subtitle: 'The race for trillion-parameter neural networks is giving way to specialized, sub-10-billion parameter systems that run efficiently on modest local hardware.',
    topic: 'Technology',
    source: 'The Computational Review',
    author: 'Elena Vance',
    authorRole: 'Systems Architecture Fellow',
    readTimeMinutes: 5,
    publishedAt: '2 hours ago',
    heroImage: techImage,
    imageCaption: 'A localized edge computing terminal executing inference directly without external cloud latency.',
    leadStory: true,
    pullQuote: 'Utility in software has never been measured by sheer scale, but by how reliably and quietly a tool accomplishes a bounded task.',
    content: [
      {
        type: 'paragraph',
        text: 'For the past three years, the dominant narrative in machine intelligence has been one of exponential expansion. Companies measured prestige by compute budgets and GPU cluster counts. Yet across engineering teams and operational departments in small to mid-sized enterprises, a quiet counter-movement is taking hold.',
      },
      {
        type: 'paragraph',
        text: 'The appeal of compact, open-weights models operating between 3 billion and 8 billion parameters lies not in theoretical general intelligence, but in deterministic reliability, predictable costs, and data sovereignty. When an organization runs an inference model on local servers or commodity hardware, questions of network latency, cloud API deprecation, and confidential data exfiltration vanish entirely.',
      },
      {
        type: 'subheading',
        text: 'The Precision of Specialization',
      },
      {
        type: 'paragraph',
        text: 'General-purpose frontier models are trained to do everything from writing Elizabethan sonnets to debugging esoteric compiler routines. This breadth requires immense computational overhead. Conversely, an enterprise rarely needs an Elizabethan poet; it needs a model that extracts line items from regional invoices, parses inventory manifests, or assists field agents with structured queries.',
      },
      {
        type: 'quote',
        text: 'When you constrain the problem domain, an 8-billion parameter model fine-tuned on clean historical data routinely outperforms an uncalibrated 500-billion parameter giant on both speed and accuracy.',
      },
      {
        type: 'paragraph',
        text: 'Furthermore, the energy footprint of local quantized inference is orders of magnitude lower. As regulatory scrutiny around compute energy intensity increases, the architectural elegance of doing more with significantly less is transitioning from an engineer’s aesthetic preference into a critical operational necessity.',
      },
      {
        type: 'subheading',
        text: 'The Horizon of Quiet Computing',
      },
      {
        type: 'paragraph',
        text: 'What we are witnessing is the normalization of a technology once treated as speculative spectacle. As models become compact enough to run in background daemon threads on ordinary laptops and smartphones, software is returning to what it does best: quietly supporting human focus rather than demanding its constant attention.',
      },
    ],
    relatedStoryIds: ['story-startups-african-founders', 'story-kenya-digital-economy'],
  },
  {
    id: 'story-kenya-digital-economy',
    title: 'Kenya’s digital economy continues to reshape small businesses',
    slug: 'kenyas-digital-economy-reshaping-small-business',
    subtitle: 'From neighborhood retail kiosks in Eldoret to craft cooperatives in Machakos, digital payments and frictionless trade rails are redefining domestic commerce.',
    topic: 'Kenya',
    source: 'The Nairobi Dispatch',
    author: 'Kiplagat Chebet',
    authorRole: 'Economic Geography Editor',
    readTimeMinutes: 6,
    publishedAt: '4 hours ago',
    heroImage: kenyaImage,
    imageCaption: 'A boutique textiles atelier in Nairobi managing regional trade orders via direct digital rails.',
    leadStory: false,
    pullQuote: 'The revolution was never about replacing physical markets; it was about removing the artificial friction between a maker and their market.',
    content: [
      {
        type: 'paragraph',
        text: 'Walking through Nairobi’s industrial borders or the lively stalls of Gikomba, one might initially notice the tactile rhythms of traditional market life: woven sisal baskets, tailor sewing pedals, the scent of cedar shavings and roasted groundnuts. Yet beside virtually every stall holder sits a discreet laminated QR code and a numeric till identifier.',
      },
      {
        type: 'paragraph',
        text: 'Kenya has long held global renown for pioneering mobile money through M-Pesa. But the current evolution is profoundly structural: micro-enterprises are moving beyond simple person-to-person money transfers to integrated digital inventory ledgers, programmatic supplier credit, and direct pan-African export channels.',
      },
      {
        type: 'subheading',
        text: 'From Informality to Verifiable Credit',
      },
      {
        type: 'paragraph',
        text: 'Historically, the greatest bottleneck for informal traders has been access to working capital. Traditional banking institutions required land title deeds or collateral that young artisans rarely possessed. Today, consistent digital transactional flow serves as verifiable provenance of creditworthiness.',
      },
      {
        type: 'quote',
        text: 'My grandfather kept receipts in biscuit tins; my father wrote in ledgers. Today, my digital ledger automatically qualifies me for raw timber procurement before the morning trucks even leave Nakuru.',
      },
      {
        type: 'paragraph',
        text: 'This shift has fundamentally diminished the risk profile of seasonal commerce. Suppliers are confident extending inventory because settlement is instantaneous and dispute resolution is backed by cryptographic transaction records.',
      },
      {
        type: 'subheading',
        text: 'Bridging Regional and Global Demand',
      },
      {
        type: 'paragraph',
        text: 'Equally significant is the dissolution of geographic isolation. Independent furniture makers in Ngong and brass jewelry artisans in Kibera now receive orders directly from collectors in Frankfurt and Tokyo without intermediary markups that previously stripped away their margins. In this calm synthesis of craftsmanship and digital efficiency, Kenya offers a compelling model for sustainable economic autonomy.',
      },
    ],
    relatedStoryIds: ['story-startups-african-founders', 'story-business-supply-chains'],
  },
  {
    id: 'story-startups-african-founders',
    title: 'Inside the new generation of African startups',
    slug: 'new-generation-african-startups',
    subtitle: 'Moving past imported Silicon Valley playbooks, founders across Lagos, Nairobi, and Kigali are building deeply grounded, capital-efficient infrastructure.',
    topic: 'Startups',
    source: 'Silicon Savanna Quarterly',
    author: 'Amina Diop',
    authorRole: 'Ventures & Industrial Policy Analyst',
    readTimeMinutes: 7,
    publishedAt: '6 hours ago',
    heroImage: startupImage,
    imageCaption: 'Founders examining supply distribution blueprints in a collaborative workshop.',
    leadStory: false,
    pullQuote: 'The companies that survive here are not built on subsidized customer acquisition, but on solving physical bottlenecks that cannot be ignored.',
    content: [
      {
        type: 'paragraph',
        text: 'The era of easy venture capital and copycat models has reached its natural conclusion. Between 2018 and 2021, an influx of overseas capital pushed African tech ecosystems to chase hyper-growth metrics mirrored after American delivery apps and consumer gadgets. Today, founders and operators have decisively turned the page.',
      },
      {
        type: 'paragraph',
        text: 'The startups thriving in 2026 are resolutely focused on what engineers call foundational infrastructure: cold chain logistics for agricultural perishable goods, distributed solar micro-grids, offline-first health record keeping, and intra-continental freight customs clearance.',
      },
      {
        type: 'subheading',
        text: 'Capital Discipline as a Competitive Edge',
      },
      {
        type: 'paragraph',
        text: 'Rather than burning capital on promotional discounts, modern African ventures prioritize unit economics from day one. Many have reached sustainable profitability with lean teams of fifteen to thirty specialists, sidestepping the boom-and-bust cycles that plagued earlier cohorts.',
      },
      {
        type: 'quote',
        text: 'When your customer is a cooperative of 2,000 dairy farmers, your software either saves them cold storage spoilage every morning or it does not. There is no room for speculative hype.',
      },
      {
        type: 'paragraph',
        text: 'This discipline has fostered an environment of high-conviction engineering. Teams are designing software optimized for intermittent 3G networks, multi-currency accounting across disparate monetary unions, and voice-assisted interfaces tailored to multilingual field teams.',
      },
      {
        type: 'subheading',
        text: 'The Pan-African Trade Corridor',
      },
      {
        type: 'paragraph',
        text: 'With the acceleration of the African Continental Free Trade Area (AfCFTA), founders are no longer building for isolated national markets. A logistics network initialized in Mombasa now orchestrates transshipments across Uganda, Rwanda, and eastern DRC under unified protocol standards, laying down the quiet railroad tracks of tomorrow’s commerce.',
      },
    ],
    relatedStoryIds: ['story-kenya-digital-economy', 'story-business-supply-chains'],
  },
  {
    id: 'story-environment-rewilding',
    title: 'Rewilding agricultural corridors: What 15 years of soil regeneration reveals',
    slug: 'rewilding-agricultural-corridors-soil-regeneration',
    subtitle: 'Longitudinal studies from East Africa and Northern Europe show that strategic ecological buffer strips dramatically restore fungal networks and water retention.',
    topic: 'Environment',
    source: 'Ecology & Biosphere Review',
    author: 'Dr. Marcus Lindqvist',
    authorRole: 'Soil Microbiologist & Principal Researcher',
    readTimeMinutes: 8,
    publishedAt: '8 hours ago',
    heroImage: environmentImage,
    imageCaption: 'A restored riparian wildlife and soil buffer adjoining perennial rotational grasslands.',
    leadStory: false,
    pullQuote: 'Nature does not need us to manufacture fertility; it simply asks that we stop interrupting the mycorrhizal dialogue beneath our feet.',
    content: [
      {
        type: 'paragraph',
        text: 'Fifteen years ago, an international consortium of agricultural scientists and agrarian landowners initiated an ambitious long-term field study. Across four distinct climatic zones—ranging from the volcanic highland loams of the Great Rift Valley to the chalky downs of Southern England—they removed 18% of intensive cropland from active tillage and allowed it to return to native perennial vegetation.',
      },
      {
        type: 'paragraph',
        text: 'The findings, published this month, challenge several foundational dogmas of modern industrial monoculture. Far from sacrificing overall yield, farms incorporating native rewilded corridors saw net farm output stabilize or even increase during drought years, while chemical input expenditures plummeted by over 40%.',
      },
      {
        type: 'subheading',
        text: 'The Underground Network of Resilience',
      },
      {
        type: 'paragraph',
        text: 'The core mechanism behind this revival is subterranean. Continuous chemical fertilizer application and deep mechanical plowing systematically fracture mycorrhizal fungal hyphae—the microscopic biological webbing that trades minerals for plant carbohydrates. When uncultivated strips were preserved, these underground networks re-colonized the adjacent agricultural beds.',
      },
      {
        type: 'quote',
        text: 'The soil transitioned from a dead mineral substrate requiring artificial intravenous feeding back into a vibrant living organ capable of absorbing torrential rains without runoff.',
      },
      {
        type: 'paragraph',
        text: 'Water retention metrics demonstrated the starkest variance. Soil within 100 meters of a regenerated biodiversity corridor retained up to 65% more moisture through severe mid-summer dry spells, effectively insulating crops against weather volatility.',
      },
      {
        type: 'subheading',
        text: 'A Blueprint for Living Landscapes',
      },
      {
        type: 'paragraph',
        text: 'As global climate patterns become increasingly erratic, the lessons of this longitudinal research point toward a reconciled landscape: one where human nourishment and ecological equilibrium exist not in hostile opposition, but in calculated mutual reinforcement.',
      },
    ],
    relatedStoryIds: ['story-science-elephant-acoustics', 'story-kenya-digital-economy'],
  },
  {
    id: 'story-business-supply-chains',
    title: 'The quiet revolution in cross-border supply chains',
    slug: 'quiet-revolution-cross-border-supply-chains',
    subtitle: 'How regional manufacturing corridors and predictive customs automation are ending the era of single-source global dependencies.',
    topic: 'Business',
    source: 'Trade & Logistics Quarterly',
    author: 'Clara Beaumont',
    authorRole: 'Senior Trade Policy Strategist',
    readTimeMinutes: 5,
    publishedAt: '12 hours ago',
    leadStory: false,
    pullQuote: 'Resilience is no longer an insurance premium you begrudgingly pay; it is the fundamental architecture of modern trade.',
    content: [
      {
        type: 'paragraph',
        text: 'For three decades, global enterprise procurement was dominated by a single objective: absolute unit cost reduction through extreme geographic centralization. Inventory was treated as a liability, and just-in-time shipping operated on the assumption of friction-free maritime corridors.',
      },
      {
        type: 'paragraph',
        text: 'A compounding series of geopolitical shocks, canal chokepoints, and climate-induced port shutdowns has decisively dismantled that fragile architecture. In its place, multinational enterprises are quietly constructing polycentric supply webs.',
      },
      {
        type: 'subheading',
        text: 'The Rise of Regional Dual-Sourcing',
      },
      {
        type: 'paragraph',
        text: 'Rather than abandoning international commerce, leading industrial manufacturers are establishing dual-hub frameworks: keeping primary volume within cost-effective overseas manufacturing hubs while maintaining redundant, highly automated facilities within regional trade zones.',
      },
      {
        type: 'paragraph',
        text: 'Automated customs declarations and digital bills of lading have reduced border clearance delays from fourteen days to under three hours across major trading blocs. What was once paperwork friction is now handled programmatically, freeing vessels to sail directly into secondary ports.',
      },
    ],
    relatedStoryIds: ['story-startups-african-founders', 'story-finance-household-liquidity'],
  },
  {
    id: 'story-finance-household-liquidity',
    title: 'Rethinking household liquidity in fluctuating inflation cycles',
    slug: 'rethinking-household-liquidity-inflation',
    subtitle: 'Modern monetary realities demand that families separate short-term cash buffers from durable purchasing power reserves.',
    topic: 'Finance',
    source: 'The Macroeconomic Journal',
    author: 'Devon Patel',
    authorRole: 'Personal Finance Fellow',
    readTimeMinutes: 4,
    publishedAt: '14 hours ago',
    leadStory: false,
    pullQuote: 'Holding paper cash in a volatile currency environment feels safe in the present, while quietly eroding the future.',
    content: [
      {
        type: 'paragraph',
        text: 'The conventional financial advice of the early 2000s instructed savers to keep six months of living expenses in a standard bank savings account. While simple, that rule was conceived in an era of near-zero inflation and predictable purchasing parity.',
      },
      {
        type: 'paragraph',
        text: 'In today’s economic landscape, leaving substantial cash balances in low-yielding deposit accounts guarantees real capital decay. Financial analysts are advocating for a tiered reserve architecture.',
      },
      {
        type: 'subheading',
        text: 'The Three-Tier Liquid Reserve',
      },
      {
        type: 'paragraph',
        text: 'The first tier consists of 30 days of immediate transactional float. The second tier—covering 3 to 6 months of baseline living costs—resides in short-duration treasury instruments or inflation-indexed money market funds. The third tier bridges into real productive assets.',
      },
      {
        type: 'paragraph',
        text: 'By treating liquidity as a dynamic spectrum rather than a static bucket, households preserve both peace of mind during unforeseen emergencies and long-term purchasing strength.',
      },
    ],
    relatedStoryIds: ['story-business-supply-chains', 'story-tech-compact-ai'],
  },
  {
    id: 'story-science-elephant-acoustics',
    title: 'Decoding the subtle acoustic signaling of savanna elephants',
    slug: 'acoustic-signaling-savanna-elephants',
    subtitle: 'Field bioacousticians in Amboseli National Park record infrasonic rumbles that travel over ten kilometers through the earth.',
    topic: 'Science',
    source: 'Natural Systems Monograph',
    author: 'Dr. Wanjiku Mwangi',
    authorRole: 'Field Bioacoustics Director',
    readTimeMinutes: 6,
    publishedAt: '18 hours ago',
    leadStory: false,
    pullQuote: 'We spent centuries thinking elephants were silent when in truth we simply lacked the sensory instruments to listen.',
    content: [
      {
        type: 'paragraph',
        text: 'At dawn along the shadow of Mount Kilimanjaro, a matriarch elephant lifts her front foot slightly, pausing motionless for nearly three minutes. To human ears, the savanna is silent save for the morning breeze through yellow acacia branches. Yet beneath the dry caliche soil, seismic waves are vibrating at 14 to 20 Hertz.',
      },
      {
        type: 'paragraph',
        text: 'Infrasonic rumbles—sound frequencies lower than the human threshold of hearing—allow elephant families separated by dozens of kilometers to coordinate migrations, announce water discoveries, and mourn deceased kin with extraordinary precision.',
      },
      {
        type: 'subheading',
        text: 'Seismic Receptors in the Sole',
      },
      {
        type: 'paragraph',
        text: 'Recent histological examinations of elephant foot anatomy reveal specialized mechanoreceptors known as Pacinian corpuscles packed densely along the periphery of the pad. These nerve clusters detect micro-tremors conducted through bedrock, converting ground vibrations into spatial directional maps in the auditory cortex.',
      },
      {
        type: 'paragraph',
        text: 'Understanding this acoustic world has immediate implications for conservation. By mapping acoustic corridors and tracking where human noise pollution—such as heavy vehicle traffic or drilling—fractures these communication networks, wildlife authorities can establish peaceful buffer zones that prevent fatal human-wildlife encounters.',
      },
    ],
    relatedStoryIds: ['story-environment-rewilding', 'story-kenya-digital-economy'],
  },
  {
    id: 'story-world-urban-walkability',
    title: 'Urban walkability transformations across mid-sized global cities',
    slug: 'urban-walkability-mid-sized-cities',
    subtitle: 'From Pontevedra to Kigali, municipal leaders are reclaiming central thoroughfares for pedestrians, trees, and quiet public life.',
    topic: 'World',
    source: 'Civic Architecture Review',
    author: 'Julian Vane',
    authorRole: 'Urban Design Columnist',
    readTimeMinutes: 5,
    publishedAt: '1 day ago',
    leadStory: false,
    pullQuote: 'A city built for automobiles is a city built for transit, not for dwelling.',
    content: [
      {
        type: 'paragraph',
        text: 'For most of the twentieth century, municipal governance measured urban vitality by traffic throughput: how rapidly vehicles could enter, cross, and exit the urban core. The consequence was predictable—fragmented neighborhoods, soaring particulate emissions, and the slow extinction of spontaneous street life.',
      },
      {
        type: 'paragraph',
        text: 'Today, the most radical municipal innovations are occurring not in sprawling megacities, but in mid-sized urban centers with populations between 100,000 and 1,500,000. In these towns, civic leaders have the flexibility to implement comprehensive pedestrianization programs without decades of bureaucratic paralysis.',
      },
      {
        type: 'subheading',
        text: 'The Economic Vitality of Slow Streets',
      },
      {
        type: 'paragraph',
        text: 'Initial resistance from merchants almost universally gives way to enthusiastic advocacy within twelve months of vehicle exclusion. When people walk rather than drive, foot traffic into local bookstores, cafes, and bakeries increases by an average of 32%. Street noise declines by 15 decibels, creating an inviting public living room.',
      },
    ],
    relatedStoryIds: ['story-health-circadian-architecture', 'story-culture-oral-histories'],
  },
  {
    id: 'story-sports-iten-endurance',
    title: 'The endurance science behind Iten’s high-altitude running camp',
    slug: 'endurance-science-iten-high-altitude',
    subtitle: 'How red volcanic dirt, hypoxic discipline, and communal pacing created the undisputed global capital of distance running.',
    topic: 'Sports',
    source: 'Athletic Physiology Letters',
    author: 'Samson Kiptum',
    authorRole: 'Exercise Physiologist',
    readTimeMinutes: 5,
    publishedAt: '1 day ago',
    leadStory: false,
    pullQuote: 'Speed is not born in isolation; it is cultivated in the quiet synchrony of thirty athletes breathing together before sunrise.',
    content: [
      {
        type: 'paragraph',
        text: 'At 2,400 meters above sea level, perched on the escarpment of the Great Rift Valley, lies the town of Iten. The sign at the entrance famously reads: "Welcome to Iten: Home of Champions." It is no exaggeration. A disproportionate number of Olympic marathon champions, world record holders, and major race victors train along its red dust trails.',
      },
      {
        type: 'paragraph',
        text: 'For decades, visiting sports scientists attributed this supremacy purely to genetics or altitude-induced erythropoietin (EPO) production. However, contemporary exercise physiology has discovered that the biological mechanism is intimately bound to communal culture and biomechanical pacing.',
      },
      {
        type: 'subheading',
        text: 'The Fartlek as Social Contract',
      },
      {
        type: 'paragraph',
        text: 'Every Thursday morning at 9:00 AM, over one hundred athletes gather at the junction in Iten for the collective fartlek—a Swedish term for "speed play." There are no timing gates, no commercial sponsorships, and no headphones. A designated leader sets the rhythm: two minutes hard, one minute floating recovery.',
      },
      {
        type: 'paragraph',
        text: 'Running in dense, unyielding packs alters the neural perception of physical exertion. When pacing is distributed across a cohort, the central governor theory of fatigue demonstrates that individual runners can sustain lactate thresholds significantly longer than when running in solitary training.',
      },
    ],
    relatedStoryIds: ['story-health-circadian-architecture', 'story-kenya-digital-economy'],
  },
  {
    id: 'story-gaming-tactile-craft',
    title: 'The enduring craft of tactile game design in an age of hyper-fidelity',
    slug: 'tactile-game-design-hyper-fidelity',
    subtitle: 'Why independent creators are stripping away photorealistic graphics in favor of tactile mechanical intimacy and deliberate pacing.',
    topic: 'Gaming',
    source: 'Interactive Arts Review',
    author: 'Yuki Takahashi',
    authorRole: 'Game Systems Essayist',
    readTimeMinutes: 6,
    publishedAt: '2 days ago',
    leadStory: false,
    pullQuote: 'A great game does not simulate reality; it offers an elegant grammar with which the player discovers their own solutions.',
    content: [
      {
        type: 'paragraph',
        text: 'Triple-A video game development in 2026 has reached a curious technological zenith. Budgets rival Hollywood blockbusters, digital lighting models calculate real-time ray-traced photon bounces, and character models display realistic subcutaneous dermal pores.',
      },
      {
        type: 'paragraph',
        text: 'Yet despite this technical perfection, players increasingly report cognitive numbness. When every leaf on a tree is simulated but the core mechanical interaction consists of following floating yellow waypoints and pressing single-button prompts, the medium loses its unique expressive power.',
      },
      {
        type: 'subheading',
        text: 'The Dignity of Mechanical Clarity',
      },
      {
        type: 'paragraph',
        text: 'In reaction, an extraordinary renaissance of quiet, mechanically deliberate indie titles has flourished. These games embrace visual restraint—monochromatic palettes, isometric drafting perspectives, and acoustic Foley recordings—allowing the player’s attention to center entirely on spatial logic and timing.',
      },
      {
        type: 'paragraph',
        text: 'By treating the player as an active collaborator rather than a passive consumer of cinematic cutscenes, these titles reaffirm that interactive art thrives not on excess, but on intentional constraint.',
      },
    ],
    relatedStoryIds: ['story-tech-compact-ai', 'story-culture-oral-histories'],
  },
  {
    id: 'story-health-circadian-architecture',
    title: 'Circadian biology and the architectural return of natural morning light',
    slug: 'circadian-biology-morning-light-architecture',
    subtitle: 'Modern clinical research into melanopsin retinal ganglion cells is forcing residential and commercial architects to rethink window orientation and indoor lux levels.',
    topic: 'Health',
    source: 'Environmental Physiology Quarterly',
    author: 'Dr. Sarah Al-Mansoor',
    authorRole: 'Neurobiology & Chronomedicine Specialist',
    readTimeMinutes: 5,
    publishedAt: '2 days ago',
    leadStory: false,
    pullQuote: 'Light is not simply an architectural convenience to avoid bumping into furniture; it is the master clock controlling every enzymatic cascade in human physiology.',
    content: [
      {
        type: 'paragraph',
        text: 'For the vast majority of human evolutionary history, the suprachiasmatic nucleus—the master circadian pacemaker in the anterior hypothalamus—was synchronized by a simple astronomical fact: the gradual sunrise progression from diffuse blue twilight to direct 100,000-lux solar illumination, followed twelve hours later by amber firelight and darkness.',
      },
      {
        type: 'paragraph',
        text: 'Over the last century, humanity moved indoors beneath perpetual, static 300-lux fluorescent or LED overhead lighting. The result is what chronobiologists describe as "circadian twilight": our bodies are never bright enough during the day to feel completely awake, and never dark enough at night to trigger deep non-REM restorative sleep.',
      },
      {
        type: 'subheading',
        text: 'The 1,000-Lux Morning Threshold',
      },
      {
        type: 'paragraph',
        text: 'Intrinsically photosensitive retinal ganglion cells (ipRGCs) express the photopigment melanopsin, which is maximally sensitive to 480nm blue-cyan wavelengths. To suppress melatonin and trigger morning cortisol release, these cells require exposure to at least 1,000 lux within ninety minutes of waking.',
      },
      {
        type: 'paragraph',
        text: 'Progressive architects are now designing residential buildings with eastern lightwells, courtyard atriums, and clerestory windows that flood morning living areas with natural solar irradiance without excessive thermal gain, restoring biological synchrony to daily domestic life.',
      },
    ],
    relatedStoryIds: ['story-world-urban-walkability', 'story-environment-rewilding'],
  },
  {
    id: 'story-culture-oral-histories',
    title: 'Preserving intangible oral histories in contemporary East African literature',
    slug: 'oral-histories-east-african-literature',
    subtitle: 'A new generation of poets, archivists, and audio documentarians are weaving proverbs and communal memory into modern digital print.',
    topic: 'Culture',
    source: 'The Literary Review of the Equator',
    author: 'Nanjala Nyabola',
    authorRole: 'Cultural Essayist & Literary Critic',
    readTimeMinutes: 7,
    publishedAt: '3 days ago',
    leadStory: false,
    pullQuote: 'Stories were never meant to be entombed on museum shelves; they live only when spoken, received, and re-imagined by the next generation.',
    content: [
      {
        type: 'paragraph',
        text: 'In many traditional African societies, the memory of an entire community was carried not in stone monuments or bound parchment, but in the living lungs of elders. The story was an event: shared around twilight fires, inflected by voice cadence, body gestures, and spontaneous audience response.',
      },
      {
        type: 'paragraph',
        text: 'During the colonial period, much of this intangible heritage was either dismissed as folklore or translated through academic filters that stripped away poetic nuance, regional rhythm, and communal ethics.',
      },
      {
        type: 'subheading',
        text: 'The Hybrid Archive',
      },
      {
        type: 'paragraph',
        text: 'Today, writers and literary collectives in Lamu, Kampala, and Dar es Salaam are developing hybrid storytelling forms. Rather than forcing oral narratives into rigid Western novel structures, they are publishing bilingual editions accompanied by high-fidelity audio recordings and vernacular glossaries.',
      },
      {
        type: 'paragraph',
        text: 'In doing so, they are not merely recording the past for academic scrutiny; they are keeping the vital pulse of indigenous wisdom alive, vibrant, and actively shaping the moral imagination of contemporary society.',
      },
    ],
    relatedStoryIds: ['story-kenya-digital-economy', 'story-world-urban-walkability'],
  },
];
